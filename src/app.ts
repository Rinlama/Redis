import express from "express";
import Redis from "ioredis";

const app = express();

// Create a Redis client
const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  username: "", // needs Redis >= 6
  password: "",
  db: 0, // Defaults to 0
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/setCache", async (req, res) => {
  const dataToCache = { message: "Data to cache" };

  await redis.set("cachedData", JSON.stringify(dataToCache));

  res.send(dataToCache);
});

app.get("/getCache", async (req, res) => {
  const dataCache = await redis.get("cachedData");
  res.send(dataCache);
});

app.listen(3000, () => {
  console.log("running ");
});
