/**
 * Created by ROB on 2018/06/17.
 */


const crud = require('../controllers/crud');

const cluster = require('../controllers/cluster');

const timeStamp = require('../controllers/time-stamps/time-stamp');


module.exports.group = async() =>{

  try{
    let cachedArticles = await crud.readFromCache('headlines_South_Africa');

    //let clusters = await cluster.cluster(cachedArticles);
    //return clusters;
    //return cachedArticles;
    let stampedArticles = await timeStamp.addTimeStamp(cachedArticles);

    return stampedArticles;

  }
  catch(error){
    console.log(error);
  }

};

//groups();
