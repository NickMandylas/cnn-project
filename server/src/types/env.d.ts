declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    PORT: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    CORS_ORIGIN: string;
    COOKIE_DOMAIN: string;
  }
}
