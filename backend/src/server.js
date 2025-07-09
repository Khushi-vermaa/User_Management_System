import dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger.js";
import http from "http";
import app from "./app.js";
const PORT = process.env.PORT;
const server = http.createServer(app);

function startServer() {
  server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
}

// Graceful shutdown for server
process.on("SIGINT", () => {
  console.log("Shutting down the server...");
  server.close(() => {
    console.log("Closed all server connections");
  });
});
startServer();
