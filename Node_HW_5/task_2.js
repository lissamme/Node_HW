
import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  try {
    throw new Error("Test server error");
  } catch (error) {
    fs.appendFile("errors.log", error.message + "\n", (err) => {
      if (err) {
        console.log("Error writing to log:", err);
      }
    });

    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("Internal Server Error");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
