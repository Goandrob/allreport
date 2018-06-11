/**
 * Created by ROB on 2018/06/02.
 */
const storage = require('node-persist');

const localPooledScrape = require('./local-pooled-scrape');
const crud = require('./crud');
const sitesLocal = require('./sites-local');





module.exports.processHeadlines = async () =>{

  let extractedHeadlines = await localPooledScrape.extractHeadlines();

  let allTodayHeadlines = await getTodayHeadlines();

  let status = await saveToDB(extractedHeadlines, allTodayHeadlines);

  saveToCache();


};




getTodayHeadlines = async ()=>{

  let allTodayHeadlines = [];
  let resultsArr = [];

  try{
    resultsArr = await crud.read();
  }catch(err){
    console.log(err);
  }

  for(let i = 0; i < sitesLocal.sites.length; i++){

    let orgTodayHeadlines = {
      org: sitesLocal.sites[i].name,
      headlines: []
    };

    for(let j= 0; j < resultsArr.length; j++){
      if(sitesLocal.sites[i].name === resultsArr[j].get('org')){
        orgTodayHeadlines.headlines.push(resultsArr[j].get('headline'));
      }
    }

    allTodayHeadlines.push(orgTodayHeadlines);
  }

  return allTodayHeadlines;

};

const saveToDB = async(extractedHeadlines, allTodayHeadlines) => {
  let existingHeadlines = [];

  let toBeSaved = [];

  let i = 0;

  if(!allTodayHeadlines.length){
    toBeSaved = extractedHeadlines;
  }else{
    while (extractedHeadlines[i]){

      let newHeadline = extractedHeadlines[i].headline;
      for(let j = 0; j< allTodayHeadlines.length; j++){

        if(extractedHeadlines[i].org === allTodayHeadlines[j].org ){


          existingHeadlines = allTodayHeadlines[j].headlines;

        }
      }

      if(existingHeadlines.indexOf(newHeadline) === -1){
        toBeSaved.push(extractedHeadlines[i]);
      }

      i++;
    }
  }
  let results =  await crud.create(toBeSaved);
  let status = results.map(result => result.id);

  return status;


};

const saveToCache = async()=>{

  let headlines = await crud.readForCache();

  await storage.init({});

  await storage.setItem('headlines', headlines);


};





