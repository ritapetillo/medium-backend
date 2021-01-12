const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const error_handler = require("node-error-handler");
const articlesRoutes = require("./services/articles");


//middlewares
server.use(express.json());
server.use(cors());

//error handler middleware
server.use(error_handler({ log: true, debug: true }));

//routes
server.use("/articles", articlesRoutes);

const PORT = process.env.PORT || 3001;
//Connect to DB and server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => {
      console.log("server connected at port ", PORT);
    })
  );
