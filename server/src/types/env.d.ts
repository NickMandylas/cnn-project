declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_SECRET: string;
    PORT: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
  }
}
