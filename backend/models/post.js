const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: String,
    default: "Aleksandr Antonov",
  },
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 30,
  },
  body: {
    type: String,
    required: true,
    minlength: 25,
  },
  img: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("Post", postSchema);
