/**
 * Created by ROB on 2018/06/02.
 */
const storage = require('node-persist');

const scrapePool = require('./scrape-pool');

const adjuster = require('./adjuster/adjuster');

const crud = require('./crud');
const sitesLocal = require('./sites/sites');


module.exports.process_Headlines_South_Africa = async () => {

  // const process_Headlines_South_Africa = async () =>{

  //Extract local headlines non-breaking
  let extractedHeadlines_South_Africa = await scrapePool.extractHeadlines_South_Africa();
  extractedHeadlines_South_Africa = await adjuster.adjust_Headlines_South_Africa(extractedHeadlines_South_Africa);

  //Retrieve a record of today's headlines
  let allExistingItems = await getExistingItems(extractedHeadlines_South_Africa, "headlines_South_Africa");

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedHeadlines_South_Africa, allExistingItems);

  //Retrieve 40 of the latest headines in the parse db
  let headlines_South_Africa = await crud.readForCache('headlines_South_Africa');

  //Save to local machine cache
  saveToCache('headlines_South_Africa', headlines_South_Africa);
};

module.exports.process_Headlines_World = async() => {

  // const process_Headlines_World = async() => {

  //Extract local headlines non-breaking
  let extractedHeadlines_World = await scrapePool.extractHeadlines_World();

  //Retrieve a record of today's headlines
  let allExistingItems = await getExistingItems(extractedHeadlines_World, "headlines_World");

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedHeadlines_World, allExistingItems);

  //Retrieve 40 of the latest headines in the parse db
  let headlines_World = await crud.readForCache('headlines_World');

  //Save to local machine cache
  saveToCache('headlines_World', headlines_World);

};

module.exports.process_FactCheck_South_Africa = async() => {

  //const process_FactCheck_South_Africa = async() => {

  //Extract local headlines non-breaking
  let extractedFactCheck_South_Africa = await scrapePool.extractFactCheck_South_Africa();

  //Retrieve a record of today's headlines
  let allExistingItems = await getExistingItems(extractedFactCheck_South_Africa, "factCheck_South_Africa");

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedFactCheck_South_Africa, allExistingItems);

  //Retrieve 40 of the latest headines in the parse db
  let factCheck_South_Africa = await crud.readForCache("factCheck_South_Africa");

  //Save to local machine cache
  if (factCheck_South_Africa.length) {
    saveToCache("factCheck_South_Africa", factCheck_South_Africa);
  }
};

module.exports.process_Opinions_South_Africa = async() => {

//const process_Opinions_South_Africa = async() => {

  //Extract local headlines non-breaking
  let extractedOpinions_South_Africa = await scrapePool.extractOpinions_South_Africa();
  extractedOpinions_South_Africa = await adjuster.adjust_Opinions_South_Africa(extractedOpinions_South_Africa);


  //Retrieve a record of today's headlines
  let allExistingItems = await getExistingItems(extractedOpinions_South_Africa,"opinions_South_Africa");

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedOpinions_South_Africa, allExistingItems);

  //Retrieve 40 of the latest headines in the parse db
  let opinions_South_Africa = await crud.readForCache("opinions_South_Africa");


  //Save to local machine cache
  if(opinions_South_Africa.length){
  saveToCache("opinions_South_Africa", opinions_South_Africa);
  }
};

module.exports.process_Opinions_World = async() => {

//const process_Opinions_World = async() => {

  //Extract local headlines non-breaking
  let extractedOpinions_World = await scrapePool.extractOpinions_World();
  extractedOpinions_World = await adjuster.adjust_Opinions_World(extractedOpinions_World);

  //Retrieve a record of today's headlines
  let allExistingItems = await getExistingItems(extractedOpinions_World, "opinions_World");

  //Save headlines that don't already exist in the parse db
  let status = await saveToDB(extractedOpinions_World, allExistingItems);

  //Retrieve 40 of the latest headines in the parse db
  let opinions_World = await crud.readForCache("opinions_World");

  //Save to local machine cache
 if (opinions_World.length) {
    saveToCache("opinions_World", opinions_World);
  }
};

const getExistingItems = async (extracted, headlines_type)=> {

  let allExistingItems = [];
  let resultsArr = [];

  try {
    resultsArr = await crud.findExistingEntries(extracted, headlines_type);
  } catch (err) {
    console.log(err);
  }

  for (let i = 0; i < sitesLocal[headlines_type].length; i++) {

    let orgExistingItems = {
      org: sitesLocal[headlines_type][i].name,
      headlines: []
    };

    for (let j = 0; j < resultsArr.length; j++) {

      if (sitesLocal[headlines_type][i].name === resultsArr[j].get('org')) {

        orgExistingItems.headlines.push(resultsArr[j].get('headline'));
      }
    }

    allExistingItems.push(orgExistingItems);
  }

  return allExistingItems;

};

const saveToDB = async(extractedHeadlines, allTodayHeadlines) => {
  let existingHeadlines = [];

  let toBeSaved = [];

  let status;

  let i = 0;

  if (!allTodayHeadlines.length) {
    toBeSaved = extractedHeadlines;
  } else {
    while (extractedHeadlines[i]) {

      let newHeadline = extractedHeadlines[i].headline;
      for (let j = 0; j < allTodayHeadlines.length; j++) {

        if (extractedHeadlines[i].org === allTodayHeadlines[j].org) {


          existingHeadlines = allTodayHeadlines[j].headlines;

        }
      }

      if (existingHeadlines.indexOf(newHeadline) === -1) {
        toBeSaved.push(extractedHeadlines[i]);
      }

      i++;
    }
  }
  if (toBeSaved.length) {
    let results = await crud.create(toBeSaved);
    status = results.map(result => result.id);
  } else {
    status = "Nothing to save";
  }

  return status;
};

const saveToCache = async(field, item)=> {


  await storage.init({
    //dir: './.node-persist/storage',
    forgiveParseErrors: true
  });

  let outcome =  await storage.setItem(field, item);

};
