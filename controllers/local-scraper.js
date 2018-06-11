/**
 * Created by ROB on 2018/05/15.
 */

const axios = require("axios");
const sitesLocal = require("./sites-local");


module.exports.scrape = async()=> {
  let sites = sitesLocal.sites;

  let shortNameArr = sites.map(site => site.shortName);
  //let objArr = [];

  try {

    let allSites = sites.map(site => axios.get(site.url));
    shortNameArr = await Promise.all(allSites);

    for(let i=0; i < sites.length; i++){
      sites[i].data = shortNameArr[i].data;
    }

    //let obj = {
    //  ewn: shortNameArr[0].data,
    //  news24: shortNameArr[1].data
    //};

    return sites;
  }
  catch(error){
    console.log(error);
  }
};



