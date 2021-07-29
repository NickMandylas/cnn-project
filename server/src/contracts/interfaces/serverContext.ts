import { Storage } from "@google-cloud/storage";
import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { RedisStore } from "connect-redis";
import { FastifyReply, FastifyRequest } from "fastify";
import { Redis } from "ioredis";

export type ServerContext = {
  req: FastifyRequest;
  res: FastifyReply;
  redis: Redis;
  store: RedisStore;
  em: EntityManager<IDatabaseDriver<Connection>>;
  storage: Storage;
};
