# Newsletter

School's newsletter for displaying current news and announcements. Written with React, Node.js and MongoDB.

## Frontend Configuration

The front has `.env` file with available options:

- `VITE_SERVER_HOST` - host of the newsletter's server
- `VITE_SERVER_PORT` - port of the newsletter's server
- `VITE_WEATHER_API_KEY` - Openweather API key

## Backend Configuration

The server can be configured via `.env` file:

- `CLIENT_HOST` - address of the frontend part of the application. Default value is `"localhost"`.
- `CLIENT_PORT` - port on which the frontend part of the application works. Default value is `5173`
- `DB_HOST` - address of the MongoDB database. Default value is `"localhost"`.
- `SERVER_PORT` - port on which the server works. Default value is `3000`
- `JWT_PRIVATE_KEY` - custom key for JWT

## Using Docker and Docker Compose

The available environment variables can be used as arguments in `docker-compose.yml` file.

In the client/nginx directory there is a basic nginx.conf file for the the React app build.
