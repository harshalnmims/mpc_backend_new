import { createClient, RedisClientType } from "redis";
import logger from "./logger";

const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });
  
  redisClient.on('error', (err) => logger.error('Redis Client Error', err));
  
  redisClient.connect()
    .then(() => logger.info('Connected to Redis'))
    .catch((err) => logger.error('Redis Connection Error', err));
 
    export default redisClient;