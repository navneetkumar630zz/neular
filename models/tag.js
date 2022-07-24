const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
  tag: {
    type: String,
    unique: true,
  },
  relatedTags: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
