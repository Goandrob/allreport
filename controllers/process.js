/**
 * Created by ROB on 2018/06/02.
 */
const storage = require('node-persist');

const scrapePool = require('./scrape-pool');
const crud = require('./crud');
const sitesLocal = require('./sites/sites');


process_Headlines_South_Africa = async () =>{

  //Extract local headlines non-breaking
  let extractedHeadlines_South_Africa = await scrapePool.extractHeadlines_South_Africa();

  //Retrieve a record of today's headlines
  let allTodayHeadlines = await getTodayHeadlines("headlines_South_Africa");

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedHeadlines_South_Africa, allTodayHeadlines);

  //Retrieve 40 of the latest headines in the parse db
  let headlines_South_Africa = await crud.readForCache('headlines_South_Africa');

  //Save to local machine cache
  saveToCache('headlines_South_Africa', headlines_South_Africa);
};

process_Headlines_World = async() =>{

  //Extract local headlines non-breaking
  let extractedHeadlines_World = await scrapePool.extractHeadlines_World();

  //Retrieve a record of today's headlines
 // let allTodayHeadlines = await getTodayHeadlines("headlines_World");

  //Save headlines that don't already exist in the parse db
 // let status = await saveToDB(extractedHeadlines_World, allTodayHeadlines);

  //Retrieve 40 of the latest headines in the parse db
 // let headlines_World = await crud.readForCache('headlines_World');

  //Save to local machine cache
  //saveToCache('headlines_World', headlines_World);

};

getTodayHeadlines = async (headlines_type)=>{

  let allTodayHeadlines = [];
  let resultsArr = [];

  try{
    resultsArr = await crud.read(headlines_type);
  }catch(err){
    console.log(err);
  }

  for(let i = 0; i < sitesLocal[headlines_type].length; i++){

    let orgTodayHeadlines = {
      org: sitesLocal[headlines_type][i].name,
      headlines: []
    };

    for(let j= 0; j < resultsArr.length; j++){
      if(sitesLocal[headlines_type][i].name === resultsArr[j].get('org')){
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

process_Headlines_World();





