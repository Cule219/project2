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
<<<<<<< HEAD

    Source.findOne({ 'id': article.source.id }).then(source => {
      console.log(source)
=======
    Source.findOne({ 'id': article.source.id }).then(source => {
>>>>>>> eaf70d6eb51c323681c564ac8c1815d7d4c9c3ed
      res.render('homepages/article', { article, source, user: req.user });
    })
  }).catch(err=>console.log(err));
});

module.exports = router;

