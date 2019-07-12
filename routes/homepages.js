const express   = require('express');
const router    = express.Router();
const Source    = require('../models/Source');
const Article   = require('../models/Article');
const User = require('../models/User')

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  Article.findOne({'_id': req.params.articleId }).populate({
    path: 'comments', populate: {path: 'author'}}).then(article =>{
    let liked;
    if(req.user !== undefined)liked = article.ratings.indexOf(req.user._id) !== -1;
    article.title = article.title.substring(0, article.title.lastIndexOf('-'));
    article.publishDate = article.publishedAt.toDateString();
    Source.findOne({ 'id': article.source.id }).then(source => {
      res.render('homepages/article', {article, source, user: req.user, liked});
    })
  }).catch(err=>console.log(err));
});

module.exports = router;

