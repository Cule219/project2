// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/project2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    description: 'sup ma dudes',
    role: 'mod',
    profileImg: 'https://d1jiktx90t87hr.cloudfront.net/223/wp-content/uploads/2016/09/michelle-prince-profile-img.png',
    reputation: 15
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    role: 'user',
    profileImg: 'https://www.martinezlawcenter.com/wp-content/uploads/2016/12/profile-img.jpg',
    reputation: 5
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

//seed for DB
const axios       = require('axios');
const Article     = require('./Article');
const Source      = require('./Source');

//seed for DB
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