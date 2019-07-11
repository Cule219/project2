const express   = require('express')
const router    = express.Router();
const Source    = require('../models/Source');
const Article   = require('../models/Article');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

router.get('/article/:articleId', (req, res, next) => {
  Article.findById({ _id: req.params.articleId }).populate({path: 'comments', populate: {path: 'author'}}).then(article =>{
    article.title = article.title.substring(0, article.title.lastIndexOf('-'))
    article.publishDate = article.publishedAt.toDateString()
    Source.findOne({ 'id': article.source.id }).then(source => {
      res.render('homepages/article', { article, source, user: req.user });
    })
  }).catch(err=>console.log(err));
});

// test route for styling
router.get('/homepages/article', (req, res) => {
  res.render('homepages/article')
})

module.exports = router;

