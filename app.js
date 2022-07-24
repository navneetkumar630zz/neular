// INIT CODE
require("dotenv").config();
require("./database");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");

const apiController = require("./controllers/apiController");
const apiRouter = require("./routes/apiRouter");

const app = express();

// SOCKET IO IMPLEMENTATION
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["https://neular.herokuapp.com", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected to socket");

  socket.on("searchTag", ({ val, limit }) => {
    apiController.searchByTag(val, limit, socket);
  });
});

// MIDDLEWARES
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://neular.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan("dev"));
// Limit requests on API from same IP address
app.use(
  "/api",
  rateLimit({
    max: 200,
    windowMs: 1000 * 60 * 60,
    message: "Too many requests from this IP, Please try again in an hour",
  })
);

// ROUTING
app.use("/api/v1/", apiRouter);

// FOR PRODUCTION
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// START SERVER
const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) throw err;
  console.log(process.env.NODE_ENV);
  console.log("Application listening on port", port);
});
