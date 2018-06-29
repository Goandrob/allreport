/**
 * Created by ROB on 2018/05/15.
 */

const axios = require("axios");



module.exports.scrape = async(sites)=> {

  let shortNameArr = sites.map(site => site.shortName);
  //let objArr = [];

  try {

    let allSites = sites.map(site => axios.get(site.url));
    shortNameArr = await Promise.all(allSites);

    for(let i=0; i < sites.length; i++){
      sites[i].data = shortNameArr[i].data;
    }

    return sites;
  }
  catch(error){
    console.log(error);
  }
};



