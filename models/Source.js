const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const sourceSchema = new Schema({
  id: String,
  name: String,
  description: String,
  url: String,
  category: {
    type: String,
    enum: ["business", "entertainment", "general", "health", "science", "sports", "technology"]
  },
  language: {
    type: String,
    enum: ["ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "se", "ud", "zh"]
  },
  country: {
    type: String
  },
  reputation: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  politicalBias: {
    type: String,
    default: 'Edit the source profile to add information about political biases.'
  },
  fundingSources: [String],
  profileImg: {
    type: String,
    default: 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg'
  },
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],
});

module.exports = mongoose.model('Source', sourceSchema);
