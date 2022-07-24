const mongoose = require("mongoose");

const ResponseSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  title: String,
  subtitle: String,
  author: String,
  avatar: String,
});

// SET INDEXES
ResponseSchema.index({ postId: 1 });

const Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;
