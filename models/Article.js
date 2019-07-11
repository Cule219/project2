const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  source: {
    id: String,
    name: String
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  publishDate: String,
  content: String,
  rating: {
    type: Number,
    default: 0
  },//this needs to be changed prior to Friday
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model('Article', articleSchema);
