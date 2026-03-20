const http = require("http");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "backend" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Backend server is running");
});

server.listen(PORT, () => {
  console.log(`[backend] running at http://localhost:${PORT}`);
});
