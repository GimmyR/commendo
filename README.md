# Commendo

[![Commendo](https://github.com/GimmyR/commendo/actions/workflows/ci.yaml/badge.svg)](https://github.com/GimmyR/commendo/actions/workflows/ci.yaml)

Commendo is a web application that allows to serve food to customers and to manage orders in food service industry.

It is built with:

- **React** & **React Router** for the frontend  
- **Nestjs** for the API  
- **PostgreSQL** for data persistence  
- **Docker** for containerized deployment

## Prerequisites

Before building or running the application, make sure you have the following installed :

* **Docker** 29.6.0
* **Docker Compose** 5.1.4

## Environment variables

For database :

```bash
# .env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=commendo
```

For NestJS :

```bash
# api/.env
DATABASE_URL="postgres://root:root@db:5432/commendo?schema=public"
SALT=12
JWT_SECRET="loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx"
```

For React :

```bash
# front/.env
VITE_API_URL=http://localhost:8000/api
```

## Struct data

If you want to edit **base language** or **admin settings** before running the application, you can open *api/src/struct.data.ts* file and edit it.

## Launch the application

Open a terminal in the project's root directory and run the following command :

```bash
docker compose --profile prod up --build
```

You can access the frontend application in your browser at http://localhost:5173 .

The API documentation is available at http://localhost:8000/api .

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
