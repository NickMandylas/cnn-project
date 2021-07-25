import connectRedis from "connect-redis";
import { fastify, FastifyInstance } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifySession from "fastify-session";
import { IncomingMessage, Server, ServerResponse } from "http";
import { RedisClient } from "redis";
import { Redis } from "./utils";
import { __prod__ } from "./utils/constants";

export default class Application {
  public host: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  public init = async (): Promise<void> => {
    this.host = fastify({
      logger: {
        prettyPrint: true,
      },
      trustProxy: __prod__ ? 1 : 0,
    });

    this.host.register(fastifyCookie);

    const redisStore = connectRedis(fastifySession as any);
    const store = new redisStore({
      client: Redis() as unknown as RedisClient,
    });

    this.host.register(fastifySession, {
      store,
      cookieName: "sid",
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        domain: __prod__ ? ".nickmandylas.com" : "",
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    });

    const PORT = process.env.PORT || 4000;

    this.host.listen(PORT, "0.0.0.0", (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  };
}
