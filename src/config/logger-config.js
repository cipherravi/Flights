const { createLogger, format, transports, level } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const { combine, timestamp, label, printf, colorize, errors } = format;
const isProd = process.env.NODE_ENV === "production";

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

const getLogger = (filePath) => {
  const fileLabel = path.basename(filePath);
  return createLogger({
    level: "debug",
    format: isProd
      ? combine(
          label({ label: fileLabel }),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss " }),
          errors({ stack: true }),
          format.json()
        )
      : combine(
          // colorize(),
          label({ label: fileLabel }),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss " }),
          errors({ stack: true }),
          myFormat
        ),
    transports: [
      new transports.Console(),
      new DailyRotateFile({
        filename: "logs/info-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        level: "info",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d", //delete after 14 days
      }),
      new transports.File({ filename: "logs/error.log", level: "error" }),
    ],
  });
};

module.exports = getLogger;
