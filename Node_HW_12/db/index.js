import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error('MONGO_URI не указан в .env');

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
let dbConnection;

export async function connectToDatabase() {
  await client.connect();
  dbConnection = client.db();
  await dbConnection.command({ ping: 1 });
  console.log('MongoDB успешно подключена');
}

export function getDb() {
  if (!dbConnection) throw new Error('Нет подключения к MongoDB');
  return dbConnection;
}
