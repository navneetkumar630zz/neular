const mongoose = require("mongoose");

const postOverviewSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      unique: true,
    },
    tag: String,
    title: String,
    subtitle: String,
    image: String,
    author: String,
    avatar: String,
    readingTime: String,
    date: String,
    description: String,
  },
  {
    strict: true,
  }
);

// SET INDEXES
postOverviewSchema.index({ tag: 1 });

const PostOverview = mongoose.model("PostOverview", postOverviewSchema);
module.exports = PostOverview;
