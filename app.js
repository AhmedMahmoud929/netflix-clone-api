require("dotenv").config();
const connect = require("./config/DB");
const express = require("express");
const app = express();
const cors = require("cors");
const handleErrors = require("./middlewares/handleErrors");
const PORT = process.env.PORT || 3000;
const authRouter = require("./routers/auth.router");
const usersRouter = require("./routers/users.router");
const moviesRouter = require("./routers/movies.router");

// Middlwares
app.use(express.json());
app.use(cors());
app.use(handleErrors);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/movies", moviesRouter);
connect();

// Server Listen
app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
