
import express from "express";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET - получить все книги
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - добавить книгу
app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const book = await Book.create({
      title,
      author,
      year
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - обновить книгу
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    const [updated] = await Book.update(
      { title, author, year },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({
        message: "Книга не найдена"
      });
    }

    const book = await Book.findByPk(id);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - удалить книгу
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Book.destroy({
      where: { id }
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Книга не найдена"
      });
    }

    res.json({ message: "Книга удалена" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
try {
  await sequelize.authenticate();
  console.log("MySQL connected successfully!");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Database connection failed:", error.message);
}
