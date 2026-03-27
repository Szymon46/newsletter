FROM node:25 AS build
WORKDIR /app/client
COPY package*.json .

ARG VITE_SERVER_HOST
ARG VITE_SERVER_PORT
ARG VITE_WEATHER_API_KEY
ENV VITE_SERVER_HOST=$VITE_SERVER_HOST
ENV VITE_SERVER_PORT=$VITE_SERVER_PORT
ENV VITE_WEATHER_API_KEY=$VITE_WEATHER_API_KEY

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
