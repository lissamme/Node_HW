import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;

// Middleware для обработки JSON в теле запросов
app.use(express.json());

// GET маршрут
app.get('/', (req: Request, res: Response) => {
  res.send('Привет, это GET запрос!');
});

// POST маршрут
app.post('/', (req: Request, res: Response) => {
  const { name, message } = req.body;
  res.send(`Привет, ${name}! Ты отправил сообщение: "${message}"`);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});