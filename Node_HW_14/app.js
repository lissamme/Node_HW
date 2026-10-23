import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Node HW 14: Express + Mongoose + populate' }));

app.post('/categories', async (req, res) => {
  try {
    const category = await Category.create({ name: req.body?.name });
    res.status(201).json(category);
  } catch (error) {
    res.status(error.name === 'ValidationError' ? 400 : 500).json({ message: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price, category } = req.body ?? {};
    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({ message: 'Укажите корректный ObjectId категории' });
    }
    if (!(await Category.exists({ _id: category }))) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500).json({ message: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI не указан в .env');
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Успешно подключились к MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message);
    process.exitCode = 1;
  }
}

start();
