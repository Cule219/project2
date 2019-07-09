const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

// test route for styling
router.get('/homepages/article', (req, res) => {
  res.render('homepages/article')
})

module.exports = router