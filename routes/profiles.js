const express   = require('express')
const router    = express.Router();
const Source    = require('../models/Source');
const Articles  = require('../models/Article');
const NewsAPI   = require('newsapi');

const newsapi = new NewsAPI('d27e647a6e484e358a50c1089f09ecae');

router.get('/source/:id', (req, res) =>{
  Source.find({'id': req.params.id}).then(data =>{
    Articles.find({'source.id': req.params.id}).then(articles =>{
      console.log(data)
      res.render('profile/source', {data, articles});
    });
  }).catch(err=>console.log(err));
});

router.get('/userProfile/:id', (req, res, next) => {
  User.find({'_id': req.params.id}).then(data => {
    res.render('profile/user', {data});
  });
});

router.get('/profile/user',(req, res) => {
  const { user } = req.params
  res.render('profile/user')
})

router.get('/profile/source/:id', (req, res) => {
  const { source } = req.params

  res.render('homepages/sources/:id', { source })
})

// test route just for styling 
router.get('/profile/source', (req, res) => {
  const { source } = req.params

  res.render('homepages/sources')
})

module.exports = router


// router.get('/source/:id', (req, res) =>{
//   newsapi.v2.topHeadlines({
//     sources: req.params.id, // id
//     // q: 'bitcoin',
//     // category: 'business',
//     language: 'en',
//     // country: 'us'
//   }).then(response => {
//     let articles = response.articles;
//     articles.forEach((element, index) => {
//       Articles.findOne({title: element.title}), (err, article) =>{
//         if(article === null){
//           console.log(article);
//           Articles.insertOne({source, author, title, description, url, urlToImage, publishedAt, content} = element);
//         }
//         else{
//           articles.splice(index, 1, element);
//         }
//       }
//     });
//     Articles.find
//     Source.find({'id': req.params.id}).then(data =>{
//       res.render('profile/source', {data, articles});
//     });
//   }).catch(err=>(console.log(err)));
  
// });
