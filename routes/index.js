const express = require('express');
const router  = express.Router();
const Article = require('../models/Article');



/* GET home page */
router.get('/', (req, res, next) => {
  Article.find({}).then(data =>{
    res.render('index', {data});
  }).catch(err=>console.log(err));
});

module.exports = router;



//{ source: [Object],
// author: null,
// title: 'Flights Delayed In Mumbai Due To Heavy Rain, 3 Diverted',
// description:
//  'Airlines have issued advisories warning passengers of further delays should the weather worsen. Air Vistara and SpiceJet tweeted asking all passengers to check their respective flight statuses for updates',
// url:
//  'https://www.ndtv.com/mumbai-news/mumbai-airport-re-opens-after-rain-forces-brief-closure-three-flights-diverted-2065903',
// urlToImage:
//  'https://c.ndtvimg.com/2019-07/6tllilps_spicejet-flight-mumbai-airport-pti_625x300_02_July_19.jpg',
// publishedAt: '2019-07-08T08:33:00+00:00',
// content:
//  'The SpiceJet plane stuck on the main runway last week led to cancellation and delay of over 250 flightsMumbai: Flight services at Mumbai airport have been delayed this morning due to heavy rain and poor visibility. Departures were halted briefly and flights s… [+4023 chars]' } ] }