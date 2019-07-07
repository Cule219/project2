const express = require('express')
const router = express.Router();

router.get('profile/source/:id', (req, res) => {
  const { source } = req.params

  res.render('homepages/sources/:id', { source })
})

router.get('profile/user/:id', (req, res) => {
  const { user } = req.params

  res.render('profile/userProfile', { user })
})

module.exports = router