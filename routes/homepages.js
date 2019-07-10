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
  Article.findById({ _id: req.params.articleId })
  .populate({path: 'comments', populate: {path: 'author'}}).then(article =>{
    Source.findOne({ 'id': article.source.id }).then(source => {
      res.render('homepages/article', {article, source});
    })
  }).catch(err=>console.log(err));
});
 

module.exports = router;

