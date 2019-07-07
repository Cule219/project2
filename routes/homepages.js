const express = require('express')
const router = express.Router()

router.get('/sources', (req, res) => {
  res.render('homepages/sources')
})

module.exports = router