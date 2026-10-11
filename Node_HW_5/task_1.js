
import http from "http";

const server = http.createServer((req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.writeHead(401, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("Unauthorized");
  } else {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end("Authorization header received");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
