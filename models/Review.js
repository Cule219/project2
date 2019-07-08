const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  title: String,
  content: String,
  rating: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: "Source"
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  type: {
    type: String,
    enum: ['mainDescription','politicalBias', 'fundingSources']
  }
});