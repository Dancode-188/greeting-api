const express = require("express");
const rateLimit = require("express-rate-limit");
const NodeCache = require("node-cache");
const winston = require("winston");

const app = express();
const cache = new NodeCache({ stdTTL: 60 }); // Cache responses for 60 seconds

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiter middleware
app.use(limiter);

// Configure logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "app.log" })],
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/api/hellovisitor", (req, res) => {
  const name = req.query.name || "Visitor";

  // Validate name parameter
  if (name.length > 20) {
    return res
      .status(400)
      .json({
        error: "Name parameter exceeded maximum length of 20 characters",
      });
  }

  // Check if response is cached
  const cachedResponse = cache.get(name);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const clientIP = req.ip;
  const timestamp = new Date().toISOString();
  const hostname = req.hostname;

  const response = {
    client_ip: clientIP,
    timestamp,
    hostname,
    greeting: `Hello, ${name}!`,
  };

  // Cache the response
  cache.set(name, response);

  logger.info({ name, clientIP, response });

  res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
