
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Проверка авторизации пользователя
export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Необходима авторизация"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Пользователь не найден"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Недействительный или просроченный токен"
    });
  }
}

// Проверка обязательной смены пароля
export function checkPasswordChange(req, res, next) {
  if (req.user.mustChangePassword) {
    return res.status(403).json({
      message: "Необходимо сменить пароль",
      redirectTo: "/change-password"
    });
  }

  next();
}


// Проверка роли администратора
export function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Доступ запрещён. Только для администратора"
    });
  }

  next();
}