const express = require('express');
const router  = express.Router();
const Article = require('../models/Article');


/* GET home page */
router.get('/', (req, res, next) => {
  Article.find({}).then(data =>{
    res.render('index', {data});
  }).catch(err=>console.log(err));
});

module.exports = router;


//this was used for category - obsolite atm
const NewsAPI   = require('newsapi');
const newsapi = new NewsAPI('d27e647a6e484e358a50c1089f09ecae');

const getNews = ()=>{
  newsapi.v2.topHeadlines({
    // sources: 'abc-news',
    // q: 'bitcoin',
    category: 'sport',
    language: 'en',
    country: 'us'
  }).then(response => {
      console.log(response);
  });
}

//Category not used anymore
// router.get('/category/:category', (req, res, next) => {
//   Article.find({category: req.params.category}).then(data =>{
//     console.log(data)
//     res.render('index', {data});
//   }).catch(err=>console.log(err));
// });