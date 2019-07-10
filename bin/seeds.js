// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const axios       = require('axios');
const Article     = require('../models/Article');
const Source      = require('../models/Source');
const Review      = require('../models/Review');
const Comment     = require('../models/Comment');

const bcryptSalt = 10;


mongoose
  .connect('mongodb://localhost/project2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// Comment.deleteMany({}).then(data=>console.log(data.length))

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    role: 'mod',
    profileImg: 'https://d1jiktx90t87hr.cloudfront.net/223/wp-content/uploads/2016/09/michelle-prince-profile-img.png',
    reputation: 15
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. 
    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`,
    role: 'user',
    profileImg: 'https://www.martinezlawcenter.com/wp-content/uploads/2016/12/profile-img.jpg',
    reputation: 5
  }
]
let sources = [
  {
    id: "bbc-news",
    name: "BBC News",
    description: `Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. 
                  Also entertainment, business, science, technology and health news`,
    url: "http://www.bbc.co.uk/news",
    category: "general",
    language: "en",
    country: "gb",
    reputation: 4.3,
    comments: [],
    profileImg: `https://liquidcinemavr.com/wp-content/uploads/2019/03/bbc-logo.jpg`,
    politicalBias: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    fundingSources: [
      'UK Government Funding: $56 million - Source: UK Government Public Expenditure Report 2018',
      'Advertising Revenue: $26 million - Source: BBC Public Accounts 2018',
      'Liberal Party: $3 million - Source: Liberal Party 2018 Spending Overview',
      'Private Investors: $1.6 million - Source: BBC Public Accounts 2018'
  ]
  },
  {
    id: "abc-news",
    name: "ABC News",
    description: `Your trusted source for breaking news, analysis, 
    exclusive interviews, headlines, and videos at ABCNews.com.`,
    url: "https://abcnews.go.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 4.2,
    comments: [],
    profileImg: `https://s.abcnews.com/assets/beta/assets/abcn_images/abcnews_pearl_stacked.png`,
    politicalBias: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    fundingSources: [
      'UK Government Funding: $56 million - Source: UK Government Public Expenditure Report 2018',
      'Advertising Revenue: $26 million - Source: BBC Public Accounts 2018',
      'Liberal Party: $3 million - Source: Liberal Party 2018 Spending Overview',
      'Private Investors: $1.6 million - Source: BBC Public Accounts 2018'
  ]},
  {
    id: "business-insider",
    name: "Business Insider",
    description: `Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. 
    Launched in 2007, the site is now the largest business news site on the web.`,
    url: "http://www.businessinsider.com",
    category: "business",
    language: "en",
    country: "us",
    reputation: 4.1,
    comments: [],
    profileImg: `https://s.abcnews.com/assets/beta/assets/abcn_images/abcnews_pearl_stacked.png`,
    politicalBias: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    fundingSources: [
      'UK Government Funding: $56 million - Source: UK Government Public Expenditure Report 2018',
      'Advertising Revenue: $26 million - Source: BBC Public Accounts 2018',
      'Liberal Party: $3 million - Source: Liberal Party 2018 Spending Overview',
      'Private Investors: $1.6 million - Source: BBC Public Accounts 2018'
    ]}
];
let userId; User.find({}).then(data => userId = data[0]._id).catch(err=>console.log(err));
let sourceId; Source.find({}).then(data => sourceId = data[0]._id).catch(err=>console.log(err));
const reviews = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit!',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Mauris porta, eros non rutrum ornare, nulla augue ullamcorper orci, eget 
    facilisis felis dui vitae erat. Nullam bibendum enim ut ipsum luctus pretium. 
    In tincidunt ligula vitae justo mattis, eu volutpat lectus venenatis. Proin vulputate 
    orci non dui lobortis tristique. Mauris scelerisque vestibulum nisl, sit amet luctus elit 
    commodo id. Morbi at viverra justo. Proin ullamcorper nunc at nisl faucibus, feugiat suscipit 
    risus vehicula. Sed non risus faucibus, pretium velit at, suscipit tellus. Suspendisse dictum 
    mollis diam. Proin tortor turpis, eleifend convallis rutrum in, efficitur a ante. `,
    rating: 5,
    user: userId,
    source: sourceId,
    type: 'mainDescription'
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

//seed for DB

Source.deleteMany()
.then(() => {
  return Source.create(sources)
})
.then(data => {
  console.log(`${data.length} source created with the following id:`);
  console.log(data.map(u => u._id));
})

// Review.deleteMany()
// .then(() => {
//   return Review.create(reviews)
// })
// .then(data => {
//   console.log(`${data.length} review created with the following id:`);
//   console.log(data.map(u => u._id));
// })

//seed with API data
const seedAPI = () => {
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
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  });
}

module.exports;

