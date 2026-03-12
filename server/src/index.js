const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const auth = require("./routes/auth");
const db = require("./db");
const news = require("./routes/news");
const swaggerDocument = require("../swagger.json");
const users = require("./routes/users");

dotenv.config();

const app = express();

if (!process.env.JWT_PRIVATE_KEY) {
  console.error("JWT_PRIVATE_KEY not set. Exiting...");
  process.exit(1);
}

const CLIENT_HOST = process.env.CLIENT_HOST || "localhost";
const CLIENT_PORT = process.env.CLIENT_PORT || 5173;
const SERVER_HOST = process.env.DB_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const corsOptions = {
  origin: CLIENT_HOST == "*" ? "*" : `http://${CLIENT_HOST}:${CLIENT_PORT}`,
  optionsSuccessStatus: 200,
};

db.connect(SERVER_HOST);

app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions));
app.use("/api/news", news);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
});

// TODO: Handle errors in the routers, not in the models
