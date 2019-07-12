const express   = require('express');
const router    = express.Router();
const Source    = require('../models/Source');
const Article   = require('../models/Article');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  let liked = false;
  Article.findOne({'_id': req.params.articleId }).populate({
    path: 'comments', populate: {path: 'author'}}).then(article =>{
    if(req.user !== undefined)if(article.ratings.indexOf(req.user._id) !== -1)liked=true
    article.title = article.title.substring(0, article.title.lastIndexOf('-'));
    article.publishDate = article.publishedAt.toDateString();
    Source.findOne({ 'id': article.source.id }).then(source => {
      res.render('homepages/article', {article, source, user: req.user, liked});
    })
  }).catch(err=>console.log(err));
});

module.exports = router;

