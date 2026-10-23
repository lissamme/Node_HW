import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Publisher from './models/Publisher.js';
import Magazine from './models/Magazine.js';
import Tag from './models/Tag.js';
import Article from './models/Article.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Node HW 13: Express + Mongoose', models: [Publisher.modelName, Magazine.modelName, Tag.modelName, Article.modelName] });
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing in .env');
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Успешно подключились к MongoDB');
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message);
    process.exitCode = 1;
    await mongoose.disconnect();
  }
}

startServer();
