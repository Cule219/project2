const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: {
    type: String,
    min: 8
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: "Source"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  rating: {
    type: Number,
    default: 0
  },
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
});

module.exports = mongoose.model('Comment', commentSchema);