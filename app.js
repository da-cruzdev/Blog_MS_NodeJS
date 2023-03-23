require("dotenv").config();
const express = require("express");
const connectDB = require("./server/config/db");
const isBlog = require("./server/middlewares/isBlog");

const app = express();

const port = process.env.PORT || 3000;
const localhost = process.env.localhost;

connectDB();
app.use(isBlog);

const adminRoute = require("./server/routes/adminRoute");
app.use("/", adminRoute);

app.listen(port, () => {
  console.log(`App listenning on port ${localhost}:${port}`);
});
