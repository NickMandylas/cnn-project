# Server

Backend Stack: Fastify, GraphQL, PostgreSQL & Redis

---

## Usage

1. Install dependencies via `yarn`
2. Create your docker container via `docker-compose up -d`
3. Create .env file based on .env.example
```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fit3164
```
4. Run via `yarn dev`
5. Server will be running and accessible via [localhost:4000](http://localhost:4000/)

---

To access GraphQL playground to view API, go to [localhost:4000/graphql](http://localhost:4000/graphql)