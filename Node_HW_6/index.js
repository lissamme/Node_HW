
import express from "express";
import connection from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// POST /
app.post("/", (req, res) => {
  const { name } = req.body || {};

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  res.json({ message: `Hello, ${name}!` });
});

// GET /products
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.message);
      return res.status(500).send("Error fetching products");
    }

    res.json(results);
  });
});

// POST /products
app.post("/products", (req, res) => {
  const { name, price } = req.body || {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      message: "Valid name and price are required"
    });
  }

  const query = "INSERT INTO products (name, price) VALUES (?, ?)";

  connection.query(query, [name, price], (err, results) => {
    if (err) {
      console.error("Error adding product:", err.message);
      return res.status(500).send("Error adding product");
    }

    res.status(201).json({
      message: "Product added successfully",
      id: results.insertId
    });
  });
});

// Неправильный маршрут
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
