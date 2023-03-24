require("dotenv").config();
const express = require("express");
const connectDB = require("./server/config/db");
const isBlog = require("./server/middlewares/isBlog");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

const port = process.env.PORT || 3000;
const localhost = process.env.localhost;

connectDB();
app.use(isBlog);
app.use(flash());
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

const adminRoute = require("./server/routes/adminRoute");
app.use("/", adminRoute);

const userRoute = require("./server/routes/userRoute");
app.use("/", userRoute);

app.listen(port, () => {
  console.log(`App listenning on port ${localhost}:${port}`);
});
