const express   = require('express');
const router    = express.Router();
const Source    = require('../models/Source');
const Article   = require('../models/Article');
const mongoose  = require('mongoose');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  let liked = false;
  Article.findOne({'_id': req.params.articleId }, (err, doc)=>{
    if(req.user == undefined){}
    else if(doc.ratings.indexOf(req.user._id) !== -1)liked=true;
  }).populate({path: 'comments', populate: {path: 'author'}}).then(article =>{
    article.title = article.title.substring(0, article.title.lastIndexOf('-'));
    article.publishDate = article.publishedAt.toDateString();
    Source.findOne({ 'id': article.source.id }).then(source => {
      res.render('homepages/article', {article, source, user: req.user, liked});
    })
  }).catch(err=>console.log(err));
});

module.exports = router;

