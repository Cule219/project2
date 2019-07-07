const mongoose    = require('mongoose');
const axios       = require('axios');
const Article     = require('./Article');

mongoose
.connect('mongodb://localhost/project2', {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});


const url = 'https://newsapi.org/v2/top-headlines?' +
'country=us&' +
'apiKey=d27e647a6e484e358a50c1089f09ecae';

axios(url).then((response)=>{
  Article.insertMany(response.data.articles);
})

// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'sources=bbc-news&' +
//           'apiKey=d27e647a6e484e358a50c1089f09ecae';


// async() => {
//   try{
//     const data = await fetch(url);
//     console.log(data)
//   }catch(err){
//     console.log(err);
//   }
// }
