require("dotenv").config();

const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");

const router = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS, TRACE"
  );
  next();
});

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "WORKING!!!" });
});

app.use(errorHandler);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("server started on " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
