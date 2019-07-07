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
    // enum: ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu",
    // "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it",
    // "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", 
    // "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"] // "pk" "es"
  }
});

module.exports = mongoose.model('Source', sourceSchema);


//single source: response.data.sources
// { id: 'abc-news',
//   name: 'ABC News',
//   description:
//    'Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.',
//   url: 'https://abcnews.go.com',
//   category: 'general',
//   language: 'en',
//   country: 'us' }