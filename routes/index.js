const express = require('express');
const router = express.Router();
//const moment = require('moment');

const crud = require('../controllers/crud');

const readFromCache = require('../controllers/read-from-cache');



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

  //crud.readFromCache()
  //  .then((articles)=>{
  //  if(articles){
  //      res.render('index', {
  //        title: 'Express',
  //        articles: articles
  //      });
  //    }
  //});

  readFromCache.group()
  .then((contentObj)=>{
    if(contentObj){
      res.render('index', {
        title: 'News',
        headlines_South_Africa: contentObj.headlines_South_Africa,
        headlines_World: contentObj.headlines_World,
        factCheck_South_Africa: contentObj.factCheck_South_Africa
      })
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
