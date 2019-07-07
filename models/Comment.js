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
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});