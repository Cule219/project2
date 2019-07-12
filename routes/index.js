const express     = require('express');
const router      = express.Router();
const Article     = require('../models/Article');

/* GET home page */
router.get('/', (req, res, next) => {
  Article.find({}).then(data =>{
    data.forEach(el => {
      el.title = el.title.substring(0, el.title.lastIndexOf('-'))
      el.publishDate = el.publishedAt.toDateString()
    })
    if (data[0].source.name === 'Showbiz411.com') data.pop();
    let first = data.pop();
    res.render('index', {data, first, user: req.user});
  }).catch(err=>console.log(err));
 });

 router.get('/about', (req, res) => {
   res.render('about')
 })


module.exports = router;
