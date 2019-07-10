const express = require('express');
const router  = express.Router();
const Article = require('../models/Article');


/* GET home page */
router.get('/', (req, res, next) => {
  Article.find({}).then(data =>{
    let first = data.pop();
    res.render('index', {data, first});
  }).catch(err=>console.log(err));
 });

module.exports = router;
