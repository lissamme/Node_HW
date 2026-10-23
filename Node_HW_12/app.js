import express from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase, getDb } from './db/index.js';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

function validProduct(data, partial = false) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  const keys = Object.keys(data);
  if (!keys.length || keys.some(k => !['name', 'price', 'description'].includes(k))) return false;
  if (!partial && !['name', 'price', 'description'].every(k => k in data)) return false;
  if ('name' in data && (typeof data.name !== 'string' || !data.name.trim())) return false;
  if ('price' in data && (typeof data.price !== 'number' || !Number.isFinite(data.price) || data.price < 0)) return false;
  if ('description' in data && typeof data.description !== 'string') return false;
  return true;
}

function validId(id) { return /^[0-9a-fA-F]{24}$/.test(id); }
function serverError(res, error) {
  console.error(error);
  return res.status(500).json({ message: 'Ошибка сервера', error: error.message });
}

app.get('/', (req, res) => res.json({ message: 'Products API работает' }));

app.post('/products', async (req, res) => {
  try {
    if (!validProduct(req.body)) return res.status(400).json({ message: 'Укажите корректные name, price и description' });
    const product = { name: req.body.name.trim(), price: req.body.price, description: req.body.description };
    const result = await getDb().collection('products').insertOne(product);
    return res.status(201).json({ _id: result.insertedId, ...product });
  } catch (error) { return serverError(res, error); }
});

app.get('/products', async (req, res) => {
  try { return res.status(200).json(await getDb().collection('products').find().toArray()); }
  catch (error) { return serverError(res, error); }
});

app.get('/products/:id', async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Некорректный ID' });
    const product = await getDb().collection('products').findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Продукт не найден' });
    return res.status(200).json(product);
  } catch (error) { return serverError(res, error); }
});

app.put('/products/:id', async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Некорректный ID' });
    if (!validProduct(req.body, true)) return res.status(400).json({ message: 'Некорректные данные продукта' });
    const updateData = { ...req.body };
    if ('name' in updateData) updateData.name = updateData.name.trim();
    const result = await getDb().collection('products').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
    if (!result.matchedCount) return res.status(404).json({ message: 'Продукт не найден' });
    return res.status(200).json({ message: 'Продукт успешно обновлён' });
  } catch (error) { return serverError(res, error); }
});

app.delete('/products/:id', async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Некорректный ID' });
    const result = await getDb().collection('products').deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ message: 'Продукт не найден' });
    return res.status(200).json({ message: 'Продукт успешно удалён' });
  } catch (error) { return serverError(res, error); }
});

connectToDatabase().then(() => app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`))).catch(error => { console.error('Ошибка подключения к MongoDB:', error.message); process.exit(1); });
