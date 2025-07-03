const createClient = require("redis").createClient;

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.connect().then(() => {
  console.log("Redis connected");
}).catch(err => {
  console.error("Redis connection error", err);
});

redisClient.on("error", err => console.error("Redis error", err));

module.exports = redisClient;
