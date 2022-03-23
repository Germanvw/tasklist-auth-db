const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();

// CORS
app.use(cors());

// Lectura y parseo body
app.use(express.json());

// Routes

app.listen(process.env.PORT, () => {
  console.log(`Running at port: `, process.env.PORT);
});
