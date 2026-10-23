import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateJWT from './middlewares/authenticateJWT.js';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('Укажите JWT_SECRET длиной минимум 32 символа в .env');
}

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


let users = [
  { id: '1', username: 'alex', email: 'user@example.com', password: await bcrypt.hash('password123', 10), role: 'user' },
  { id: '2', username: 'boss', email: 'admin@example.com', password: await bcrypt.hash('admin123', 10), role: 'admin' }
];

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

function publicUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}


function authorizeRole(role) {
  return (req, res, next) => {
    const currentUser = users.find(u => u.id === req.user.id);
    if (!currentUser) return res.status(404).json({ message: 'Пользователь не найден' });
    if (currentUser.role !== role) return res.status(403).json({ message: 'Доступ запрещён' });
    next();
  };
}

app.get('/', (req, res) => res.json({ message: 'Node.js Homework 10 API' }));

app.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Укажите email и пароль' });
  }
  try {
    const user = users.find(u => u.email === email.toLowerCase().trim());
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    return res.json({ message: 'Вход выполнен', token: createToken(user) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/profile', authenticateJWT, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  return res.json(publicUser(user));
});
app.get('/me', authenticateJWT, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  return res.json(publicUser(user));
});
app.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Добро пожаловать, администратор!' });
});

// Задание 1: изменение email владельцем аккаунта.

app.put('/update-email', authenticateJWT, (req, res) => {
  const { email } = req.body ?? {};
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: 'Укажите корректный email' });
  }
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some(u => u.id !== user.id && u.email === normalizedEmail)) {
    return res.status(409).json({ message: 'Email уже используется' });
  }
  user.email = normalizedEmail;
  return res.json({ message: 'Email успешно обновлён', user: publicUser(user) });
});

// Задание 2: удаление собственного аккаунта.

app.delete('/delete-account', authenticateJWT, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  users = users.filter(u => u.id !== req.user.id);
  return res.json({ message: 'Аккаунт успешно удалён' });
});

// Задание 3: изменение роли только администратором.

app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { userId, role } = req.body ?? {};
  if (typeof userId !== 'string' || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Укажите userId и роль user или admin' });
  }
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  user.role = role;
  return res.json({ message: 'Роль успешно обновлена', user: publicUser(user) });
});

// Задание 4: выдача нового JWT по действующему JWT.

app.post('/refresh-token', authenticateJWT, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  return res.json({ message: 'Токен обновлён', token: createToken(user) });
});

app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));
