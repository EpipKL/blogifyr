const mongoose = require("mongoose");
require("dotenv").config();

// mongodb://localhost:27017

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogifyr", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
