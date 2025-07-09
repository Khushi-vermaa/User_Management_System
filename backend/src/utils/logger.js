import path from "path";
import { fileURLToPath } from "url";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = format;

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom Log Format
const myFormat = printf((info) => {
  const date = new Date();
  if (info.timestamp && typeof info.timestamp === "string") {
    date.setTime(Date.parse(info.timestamp));
  }
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${
    info.label
  }] ${info.level}: ${info.message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(label({ label: "PH" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "phu-%DATE%-success.log"
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export default logger;
