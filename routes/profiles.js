const express = require('express')
const router = express.Router();

router.get('/profile/source/:id', (req, res) => {
  const { source } = req.params

  res.render('homepages/sources/:id', { source })
})

router.get('/profile/user', (req, res) => {
  const { user } = req.params

  res.render('profile/userProfile')
})

router.get('/userProfile/:id', (req, res, next) => {
  User.find({'_id': req.params.id}).then(data => {
    res.render('profile/userProfile', {data});
  });
});

router.get('/source/:id', (req, res) =>{
  Source.find({'id': req.params.id}).then(data =>{
    res.render('companyProfile', {data});
  });
});


module.exports = router