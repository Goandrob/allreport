/**
 * Created by ROB on 2018/06/17.
 */


const crud = require('../controllers/crud');

const cluster = require('../controllers/cluster');

const timeStamp = require('../controllers/time-stamps/time-stamp');


module.exports.group = async() =>{

  try{
    let cached_Headlines_South_Africa = await crud.readFromCache('headlines_South_Africa');

    //let clusters = await cluster.cluster(cached_Headlines_South_Africa);
    //return clusters;
    //return cached_Headlines_South_Africa;
    let stamped_Headlines_South_Africa= await timeStamp.addTimeStamp(cached_Headlines_South_Africa);

    let cached_Headlines_World = await crud.readFromCache('headlines_World');
    let stamped_Headlines_World = await timeStamp.addTimeStamp(cached_Headlines_World);

    let cached_FactCheck_South_Africa = await crud.readFromCache('factCheck_South_Africa');
    let stamped_FactCheck_South_Africa = await timeStamp.addTimeStamp(cached_FactCheck_South_Africa);

    let cached_Opinions_South_Africa = await crud.readFromCache('opinions_South_Africa');
    let stamped_Opinions_South_Africa = await timeStamp.addTimeStamp(cached_Opinions_South_Africa);

    let cached_Opinions_World = await crud.readFromCache('opinions_World');
    let stamped_Opinions_World = await timeStamp.addTimeStamp(cached_Opinions_World);

    let opinions = stamped_Opinions_South_Africa.concat(stamped_Opinions_World);

    opinions = opinions.sort(function(a, b) {
      return a.createdAt- b.createdAt;
    });




    let contentObj = {
      headlines_South_Africa: stamped_Headlines_South_Africa,
      headlines_World: stamped_Headlines_World,
      factCheck_South_Africa: stamped_FactCheck_South_Africa,
      opinions: opinions
    };

    return contentObj;

  }
  catch(error){
    console.log(error);
  }

};

//groups();
