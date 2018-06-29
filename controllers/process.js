/**
 * Created by ROB on 2018/06/02.
 */
const storage = require('node-persist');

const localPooledScrape = require('./scrape-pool');
const crud = require('./crud');
const sitesLocal = require('./sites/sites');





process_Headlines_South_Africa = async () =>{

  //Extract local headlines non-breaking
  let extractedHeadlines_South_Africa = await localPooledScrape.extractHeadlines_South_Africa();

  //Retrieve a record of today's headlines
  let allTodayHeadlines = await getTodayHeadlines();

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedHeadlines_South_Africa, allTodayHeadlines);

  //Retrieve 40 of the latest headines in the parse db
  let headlines_South_Africa = await crud.readForCache();

  //Save to local machine cache
  saveToCache('headlines_South_Africa', headlines_South_Africa);
};

module.exports.process_Headlines_International = async() =>{


};

getTodayHeadlines = async ()=>{

  let allTodayHeadlines = [];
  let resultsArr = [];

  try{
    resultsArr = await crud.read();
  }catch(err){
    console.log(err);
  }

  for(let i = 0; i < sitesLocal.headlines_South_Africa.length; i++){

    let orgTodayHeadlines = {
      org: sitesLocal.headlines_South_Africa[i].name,
      headlines: []
    };

    for(let j= 0; j < resultsArr.length; j++){
      if(sitesLocal.headlines_South_Africa[i].name === resultsArr[j].get('org')){
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

const saveToCache = async(field, item)=>{



  await storage.init({
    dir: './.node-persist/storage',
    forgiveParseErrors: true
  });

  await storage.setItem('headlines_South_Africa', item);


};

process_Headlines_South_Africa();





