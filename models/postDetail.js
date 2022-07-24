const mongoose = require("mongoose");

const postDetailSchema = mongoose.Schema({
  postId: {
    type: String,
    unique: true,
    required: true,
  },
  tags: [String],
  title: String,
  subtitle: String,
  author: String,
  avatar: String,
  readingTime: Number,
  date: Date,
  article: Array,
  responseCount: Number,
  mediumLink: String,
});

const PostDetail = mongoose.model("PostDetail", postDetailSchema);
module.exports = PostDetail;
