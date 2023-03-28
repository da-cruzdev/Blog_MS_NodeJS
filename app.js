require("dotenv").config();
const express = require("express");
const connectDB = require("./server/config/db");
const isBlog = require("./server/middlewares/isBlog");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();

const http = require("http").createServer(app);

const { Server } = require("socket.io");

const io = new Server(http, {});

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

app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  next();
});

const adminRoute = require("./server/routes/adminRoute");
app.use("/", adminRoute);

const userRoute = require("./server/routes/userRoute");
app.use("/", userRoute);

const blogRoute = require("./server/routes/blogRoute");
app.use("/", blogRoute);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("new_post", (formData) => {
    socket.broadcast.emit("new_post", formData);
  });

  socket.on("new_comment", (comment) => {
    io.emit("new_comment", comment);
  });

  socket.on("new_reply", (reply) => {
    io.emit("new_reply", reply);
  });
});

http.listen(port, () => {
  console.log(`App listenning on port ${localhost}:${port}`);
});

// app.listen(port, () => {
//   console.log(`App listenning on port ${localhost}:${port}`);
// });
