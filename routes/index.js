const express = require('express');
const router = express.Router();
//const moment = require('moment');

const crud = require('../controllers/crud');



//const timeAgo = (articles) => {
//  let timeAgoArticles = [];
//
//  for(let i= 0; i< articles.length; i++){
//    articles[i]["timeAgo"] = moment(articles[i]["createdAt"]).fromNow();
//    timeAgoArticles.push(articles[i]);
//  }
//
//  return timeAgoArticles;
//
//};

/* GET home page. */
router.get('/', (req, res) => {

  crud.readFromCache()
    .then((articles)=>{
    if(articles){
        res.render('index', {
          title: 'Express',
          articles: articles
        });
      }
  });


  //dailyWireScraper.scrape().then((articles)=>{
  //  //if(articles){
  //    res.render('index', {
  //      title: 'Express',
  //      articles: articles
  //    });
  //  //}
  //});
  //res.render('index', {
  //  title: 'Express'
  //});
});








module.exports = router;