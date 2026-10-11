
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import sequelize from "./config/db.js";
import User from "./models/User.js";
import {
  authMiddleware,
  checkPasswordChange,
  adminMiddleware
} from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Задача 1. Регистрация пользователя
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Email и пароль обязательны"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Пользователь с таким email уже существует"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: normalizedEmail,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Пользователь зарегистрирован",
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Пользователь с таким email уже существует"
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Ошибка сервера"
    });
  }
});

// Задача 2. Вход пользователя
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Email и пароль обязательны"
      });
    }

    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() }
    });

    if (!user) {
      return res.status(401).json({
        message: "Неверный email или пароль"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Неверный email или пароль"
      });
    }

    // Создаём JWT-токен
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Проверяем обязательную смену пароля
    if (user.mustChangePassword) {
      return res.json({
        message: "Необходимо сменить пароль",
        redirectTo: "/change-password",
        token
      });
    }

    return res.json({
      message: "Вход выполнен успешно",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка сервера"
    });
  }
});

// Задача 2. Смена пароля
app.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {};

    if (
      typeof currentPassword !== "string" ||
      !currentPassword ||
      typeof newPassword !== "string" ||
      !newPassword
    ) {
      return res.status(400).json({
        message: "Укажите текущий и новый пароль"
      });
    }

    const user = req.user;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Неверный текущий пароль"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await user.update({
      password: hashedPassword,
      mustChangePassword: false
    });

    return res.json({
      message: "Пароль успешно изменён"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Ошибка сервера"
    });
  }
});


// Задача 3. Удаление собственного аккаунта
app.post(
  "/delete-account",
  authMiddleware,
  checkPasswordChange,
  async (req, res) => {
    try {
      const { password } = req.body ?? {};

      if (typeof password !== "string" || !password) {
        return res.status(400).json({
          message: "Введите текущий пароль"
        });
      }

      const user = req.user;

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Неверный пароль"
        });
      }

      await user.destroy();

      return res.json({
        message: "Аккаунт успешно удалён"
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Ошибка сервера"
      });
    }
  }
);

// Задача 4. Доступ только для администратора
app.get(
  "/admin",
  authMiddleware,
  checkPasswordChange,
  adminMiddleware,
  (req, res) => {
    return res.json({
      message: "Добро пожаловать в панель администратора"
    });
  }
);


// Задача 5. Изменение email
app.post(
  "/change-email",
  authMiddleware,
  checkPasswordChange,
  async (req, res) => {
    try {
      const { newEmail, password } = req.body ?? {};

      if (
        typeof newEmail !== "string" ||
        !newEmail.trim() ||
        typeof password !== "string" ||
        !password
      ) {
        return res.status(400).json({
          message: "Укажите новый email и текущий пароль"
        });
      }

      const user = req.user;
      const normalizedEmail = newEmail.trim().toLowerCase();

      // Проверяем текущий пароль
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Неверный пароль"
        });
      }

      // Проверяем уникальность нового email
      const existingUser = await User.findOne({
        where: { email: normalizedEmail }
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Этот email уже используется"
        });
      }

      // Сохраняем новый email
      await user.update({
        email: normalizedEmail
      });

      return res.json({
        message: "Email успешно изменён",
        email: user.email
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
          message: "Этот email уже используется"
        });
      }

      console.error(error);

      return res.status(500).json({
        message: "Ошибка сервера"
      });
    }
  }
);


// Запуск сервера
try {
  await sequelize.authenticate();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Database connection failed:", error.message);
}
