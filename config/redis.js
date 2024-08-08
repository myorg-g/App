const redis = require('redis');
const { REDIS_URL } = process.env;

const redisClient = redis.createClient({
    url: REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.connect();

module.exports = redisClient;
