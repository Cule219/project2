const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

module.exports = router
