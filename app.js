require("dotenv").config();

const express = require("express");
const connectDB = require("./server/config/db");

const app = express();

const port = process.env.PORT;
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listenning on port ${port}`);
});
