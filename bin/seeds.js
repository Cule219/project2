// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const axios = require("axios");
const Article = require("../models/Article");
const Source = require("../models/Source");

const bcryptSalt = 10;

mongoose
  .connect(
    "mongodb://heroku_37hfp4s6:di6paaqe1apbgljkf8q3a83kta@ds249967.mlab.com:49967/heroku_37hfp4s6",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Comment.deleteMany({}).then(data=>console.log(data.length))

let sources = [
  {
    id: "bbc-news",
    name: "BBC News",
    description:
      "The BBC are widely regarded as the UK's top and most reliable news sources with a strong legacy of upstanding reporting with emphasis on social issues and telling the stories of those around the world who might not have the chance to be heard. However, due to their political relationships and prestigous nature, the organisation can demonstrate certain political leanings. Overall, the BBC is one of the more reliable UK news sources but one must be cautious of the organisation's relationships with senior members of the UK's leading political parties.",
    url: "www.bbc.co.uk/news",
    category: "general",
    language: "en",
    country: "gb",
    reputation: 4.3,
    comments: [],
    profileImg: `https://liquidcinemavr.com/wp-content/uploads/2019/03/bbc-logo.jpg`,
    politicalBias:
      "The BBC has historically been a centre-right organisation. It's a publically funded, urban organisation with a higher proportion of young people and ethnic minorities. Therefore it tends to hold a liberal bias and, whilst it aligns with the Liberal Party ideals, it also closely allies with the Tories. Writers can often flex their own political opinions and agendas so it's best to be aware.",
    fundingSources: [
      "UK Government Funding: $56 million - Source: UK Government Public Expenditure Report 2018",
      "Advertising Revenue: $26 million - Source: BBC Public Accounts 2018",
      "Liberal Party: $3 million - Source: Liberal Party 2018 Spending Overview",
      "Private Investors: $1.6 million - Source: BBC Public Accounts 2018"
    ]
  },
  {
    id: "abc-news",
    name: "ABC News",
    description:
      "ABC, the American Broadcasting Corporation, is one of the most prominent names in the American national broadcasting sphere and is known around the global. It is also present in the Australian continent under the alias Australian Broadcasting Corporation. It is known across the country and as a host for famous shows such as the Jimmy Kimmel show. ",
    url: "www.abcnews.go.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 4.2,
    comments: [],
    profileImg: `https://s.abcnews.com/assets/beta/assets/abcn_images/abcnews_pearl_stacked.png`,
    politicalBias:
      "ABC is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, ABC holds a centre left swing with a left leaning and liberal view on many convtroversial topics. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Private Investment: $30 million - Source: ABC Inc Income Report 2018",
      "Advertising Revenue: $29 million - Source: ABC Inc Income Report 2018",
      "National Broadcasting Grant: $15 million - Source: ABC Inc Income Report 2018"
    ]
  },
  {
    id: "business-insider",
    name: "Business Insider",
    description: `Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web. Business Insider has typically focused on a more forward thinking and innovative audience than traditional print media, appealing to this base through the savvy use of social media to gather and retain new readers. Lucrative spending on media focused advertising avenues has reinforced this drive and thus given Business Insider the image of a media source who challenges normal thinking.`,
    url: "www.businessinsider.com",
    category: "business",
    language: "en",
    country: "us",
    reputation: 4.1,
    comments: [],
    profileImg: `https://amp.businessinsider.com/images/597a0306b50ab126008b4b46-750-342.png`,
    politicalBias:
      "Business Insider is a privately held corporation and, as such, is more susceptible to the political leanings of it's leaders. Therefore readers should be aware that the company owners, Brian Anthony and Chris Gunning, are staunchly left-wing and liberal thinkers. This can be conveyed through the leanings of the content that is present in both the print and online editions of Business Insider.",
    fundingSources: [
      "Private Investment: $70 million - Source: Business Insider Annual Report 2018",
      "Advertising Revenue: $26 million - Source: Business Insider Annual Report 2018",
      "Anonymous Sources: $1.7 million - Source: Business Insider Annual Report 2018"
    ]
  },
  {
    id: "reuters",
    name: "Reuters",
    description:
      "Reuters is one of the most prominent names in the American national broadcasting sphere and is known around the global. It is also present in the Australian continent under the alias Australian Broadcasting Corporation. It is known across the country and is a most notable for its coverage of business and financial news, placing itself as a forerunner in the industry on these topics. ",
    url: "www.reuters.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 4.2,
    comments: [],
    profileImg: `https://www.nlgja.org/wp-content/uploads/2018/01/Reuters-logo-square-2017.png`,
    politicalBias:
      "Reuters is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, Reuters holds a centre political stance with a left leaning and liberal view on many convtroversial topics. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Private Investment: $30 million - Source: ABC Inc Income Report 2018",
      "Advertising Revenue: $29 million - Source: ABC Inc Income Report 2018",
      "National Broadcasting Grant: $15 million - Source: ABC Inc Income Report 2018"
    ]
  },
  {
    id: "cnn",
    name: "CNN",
    description:
      "CNN, the Cable News Network, is one of the most prominent names in the American national broadcasting sphere and is known around the global. CNN is owned by Turner Broadcasting which is in turn owned by Time Warner. Other holdings of Time Warner include HBO and Warner Brothers.",
    url: "www.cnn.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 4.2,
    comments: [],
    profileImg: `https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg`,
    politicalBias:
      "CNN is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, CNN holds a right of centre political stance. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Advertising Revenue: $89 million - Source: CNN Income Report 2018",
      "Cable Company Subscriptions: $75 million - Source: CNN Income Report 2018"
    ]
  },
  {
    id: "cnbc",
    name: "CNBC",
    description:
      "CNBC, the Cable News Network, is one of the most prominent names in the American national broadcasting sphere relating to the stock market and is known around the global. CNBC is owned by NBC Universal Broadcast which is in turn owned by Comcast. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel quam ac odio auctor laoreet sit amet in orci. Duis accumsan sed elit sed dictum. Curabitur convallis semper sapien nec iaculis. ",
    url: "www.cnbc.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 4.2,
    comments: [],
    profileImg: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/701px-CNBC_logo.svg.png`,
    politicalBias:
      "CNN is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, CNN holds a right of centre political stance. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Advertising Revenue: $89 million - Source: CNN Income Report 2018",
      "Cable Company Subscriptions: $75 million - Source: CNN Income Report 2018"
    ]
  },
  {
    id: "fox-news",
    name: "Fox News",
    description:
      "Fox News is one of the most prominent names in the American national broadcasting sphere relating to the stock market and is known around the global. Fox News is owned by NBC Universal Broadcast which is in turn owned by Comcast. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel quam ac odio auctor laoreet sit amet in orci. Duis accumsan sed elit sed dictum. Curabitur convallis semper sapien nec iaculis. ",
    url: "www.fox-news.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 174,
    comments: [],
    profileImg: `https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg`,
    politicalBias:
      "Fox News is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, Fox News holds a right of centre political stance. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Advertising Revenue: $89 million - Source: Fox News Income Report 2018",
      "Cable Company Subscriptions: $75 million - Source: Fox News Income Report 2018"
    ]
  },
  {
    id: "usa-today",
    name: "USA Today",
    description:
      "USA Today is one of the most prominent names in the American national broadcasting sphere relating to the stock market and is known around the global. USA Today is owned by NBC Universal Broadcast which is in turn owned by Comcast. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel quam ac odio auctor laoreet sit amet in orci. Duis accumsan sed elit sed dictum. Curabitur convallis semper sapien nec iaculis. ",
    url: "www.usatoday.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 174,
    comments: [],
    profileImg: `https://www.american.edu/uploads/standard/large/01_Primary_01_FullColor_USATODAY_Logo_Prm_FullClr_RGB_600copy.png`,
    politicalBias:
      "USA Today is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, USA Today holds a right of centre political stance. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Advertising Revenue: $89 million - Source: USA Today Income Report 2018",
      "Cable Company Subscriptions: $75 million - Source: USA Today Income Report 2018"
    ]
  },
  {
    id: "nbc-news",
    name: "NBC News",
    description:
      "NBC News is one of the most prominent names in the American national broadcasting sphere relating to the stock market and is known around the global. NBC News is owned by NBC Universal Broadcast which is in turn owned by Comcast. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel quam ac odio auctor laoreet sit amet in orci. Duis accumsan sed elit sed dictum. Curabitur convallis semper sapien nec iaculis. ",
    url: "www.nbc-news.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 174,
    comments: [],
    profileImg: `https://i0.wp.com/www.icingsmiles.org/wp-content/uploads/2015/09/NBC-Logo.png?ssl=1`,
    politicalBias:
      "NBC News is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, NBC News holds a right of centre political stance. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Advertising Revenue: $89 million - Source: NBC News Income Report 2018",
      "Cable Company Subscriptions: $75 million - Source: NBC News Income Report 2018"
    ]
  },
  {
    id: "politico",
    name: "Politico",
    description:
      "Politico is one of the most prominent names in the American national broadcasting sphere relating to the stock market and is known around the global. Politico is owned by NBC Universal Broadcast which is in turn owned by Comcast. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel quam ac odio auctor laoreet sit amet in orci. Duis accumsan sed elit sed dictum. Curabitur convallis semper sapien nec iaculis. ",
    url: "www.politico.com",
    category: "general",
    language: "en",
    country: "us",
    reputation: 174,
    comments: [],
    profileImg: `https://pmcvariety.files.wordpress.com/2016/05/politico-logo.jpg?w=913&h=513&crop=1`,
    politicalBias:
      "Politico is one of America's leading media corporations and, as such, is suspecible to the ever pervading influence, and push and pull, of mainstream American politics. Traditionally, Politico holds a right of centre political stance. The broadcasting network's host of hosts and representatives deliberately reinforces this left leaning political stance to appease the viewing audience.",
    fundingSources: [
      "Advertising Revenue: $89 million - Source: Politico Income Report 2018",
      "Cable Company Subscriptions: $75 million - Source: Politico Income Report 2018"
    ]
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  });

//seed for DB

Source.deleteMany()
  .then(() => {
    return Source.create(sources);
  })
  .then(data => {
    console.log(`${data.length} source created with the following id:`);
    console.log(data.map(u => u._id));
  });

//seed with API data
const seedAPI = () => {
  const url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=d27e647a6e484e358a50c1089f09ecae"; //link for rand Articles

  const source =
    "https://newsapi.org/v2/sources?apiKey=d27e647a6e484e358a50c1089f09ecae"; // link for Source
  axios(url).then(response => {
    Article.insertMany(response.data.articles)
      .then(data => console.log(data.length))
      .catch(err => console.log(err));
  });
  axios(source)
    .then(response => {
      Source.insertMany(response.data.sources)
        .then(data => console.log(data.length))
        .catch(err => console.log(err));
    })
    .then(() => {
      console.log("sources successfully added");
      // Close properly the connection to Mongoose
      // mongoose.disconnect()
    })
    .catch(err => {
      mongoose.disconnect();
      throw err;
    });
};

seedAPI();
setTimeout(() => {
  mongoose.disconnect();
}, 5000);

module.exports;
