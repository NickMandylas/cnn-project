# FIT3164 Project

A proposed online all-in-one platform that aims to easily allow medical professionals to upload images of skin lesions to a nerual network which will be analysed by a neural network for the likelihood of whether the lesion is malignant form of cancer, as well as the likely variant. 

---

This project has three distinct packages in order for the platform to run:

### Server

Backend API server built with Typescript.

Technologies utilised:
- [Fastify](https://www.fastify.io/) (Web Framework)
- [Mercurius](https://mercurius.dev/#/) (GraphQL Middleware)
- [MikroORM](https://mikro-orm.io/) (PostgreSQL ORM)
- [ioredis](https://github.com/luin/ioredis) (Redis Client)


### Web

Frontend Website built with Typescript.

Technologies utilised:
- [ReactJS](https://reactjs.org/) (Frontend Framework)
- [NextJS](https://nextjs.org/) (Frontend Framework)
- [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL Client / State Management)
- [Bumbag](https://bumbag.style/) (Components Library)


### Machine Learning

TBD

---

Instructions to run each individual package can be found in the README file of each package.