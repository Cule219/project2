const mongoose    = require('mongoose');
const axios       = require('axios');
const Article     = require('./Article');
const Source      = require('./Source');

mongoose
.connect('mongodb://localhost/project2', {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});


const url = 
'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=d27e647a6e484e358a50c1089f09ecae'; //link for rand Articles

const source = 
'https://newsapi.org/v2/sources?apiKey=d27e647a6e484e358a50c1089f09ecae' // link for Source

axios(url).then(response=>{
  Article.insertMany(response.data.articles)
  .then(data =>console.log(data.length)).catch(err=>console.log(err));
})
axios(source).then(response=>{
  Source.insertMany(response.data.sources)
  .then(data => console.log(data.length)).catch(err=>console.log(err));
});

// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'sources=bbc-news&' +
//           'apiKey=d27e647a6e484e358a50c1089f09ecae';

function seedDB(source, category){
  
} 

module.exports = seedDB();