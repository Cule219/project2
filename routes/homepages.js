const express = require('express')
const router  = express.Router()
const Source  = require('../models/Source');

router.get('/homepages/sources', (req, res) => {
  Source.find({}).then(data => {
    res.render('homepages/sources', {data})
  }).catch(err => console.log(err));
})

module.exports = router



// const newsapi = new NewsAPI('d27e647a6e484e358a50c1089f09ecae');


// router.get('profile/source/:id', (req, res) => {
//   const { source } = req.params

//   res.render('homepages/sources/:id', { source })
// })

// router.get('profile/user/:id', (req, res) => {
//   const { user } = req.params

//   res.render('profile/userProfile', { user })
// })


// router.get('/user/:id', (req, res, next) => {
//   User.find({'_id': req.params.id}).then(data => {
//     res.render('profile/user', {data});
//   });
// });

// router.get('/source/:id', (req, res) =>{
//   Source.find({'id': req.params.id}).then(data =>{
//     Articles.find({'source.id': req.params.id}).then(articles =>{
//       res.render('profile/source', {data, articles});
//     });
//   }).catch(err=>console.log(err));
// });
  