
const fs = require("fs");
require("dotenv").config();

const filename = process.env.FILENAME;

fs.writeFileSync(filename, "Hello! This is my Node.js homework.");

const data = fs.readFileSync(filename, "utf8");

console.log("File content:", data);