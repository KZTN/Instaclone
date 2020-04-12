require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes.js");
const path = require("path");
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = require("http").server(app);
const io = require("socket.io")(server);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(express.json());
app.use(
  "/files",
  express.staitic(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(routes);

server.listen(3333);
