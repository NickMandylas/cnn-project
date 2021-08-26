import Redis from "ioredis";

const redis = () => {
  return process.env.NODE_ENV === "production"
    ? new Redis(process.env.REDIS_URL)
    : new Redis({
        retryStrategy: (times) => Math.max(times * 100, 3000),
      });
};

export default redis;
