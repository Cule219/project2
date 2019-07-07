const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  source: Object,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String
});

module.exports = mongoose.model('Article', articleSchema);






//single article: res.data.articles

// { source: { id: null, name: 'Phonearena.com' },
//   author: 'Alan Friedman',
//   title:
//    'Apple iPhone users escape bug that would have forced them to factory resrt their phone - Phone Arena',
//   description:
//    'The iOS 12.3 update disseminated in May fixed a bug that could have forced Apple iPhone users to factory reset their phone after receiving a particular malformed iMessage.',
//   url:
//    'https://www.phonearena.com/news/Exterminated-bug-could-have-forced-iPhone-users-to-factory-reset-their-device_id117310',
//   urlToImage:
//    'https://i-cdn.phonearena.com/images/article/117310-two_lead/Apple-iPhone-users-escape-bug-that-would-have-forced-them-to-factory-resrt-their-phone.jpg',
//   publishedAt: '2019-07-07T05:23:47Z',
//   content:
//    'All content, features, and design are Copyright 2001-2019 PhoneArena.com. All rights reserved. Reproduction in whole or in part or in any form or medium without written permission is prohibited!' }
