const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AritcleSchema = schema({
  headLine: String,
  subHead: String,
  content: String,
  category: {
    name: String,
    img: String,
  },
  author: {
    name: String,
    img: String,
  },
  cover: String,
  createdAt: { type: String, default: Date.now() },
  updatedAt: { type: String, default: Date.now() },
});

module.exports = mongoose.model("articles", AritcleSchema);
