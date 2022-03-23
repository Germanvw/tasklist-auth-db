const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config.js");

require("dotenv").config();
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Lectura y parseo body
app.use(express.json());

// Routes
//api/auth
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Running at port: `, process.env.PORT);
});
