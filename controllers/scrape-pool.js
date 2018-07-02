const scraper = require('./scraper');
const extractSelectors = require('./extract-selectors');
const selectorList = require('./selector-list');
const allSites = require("./sites/sites");

module.exports.extractHeadlines_South_Africa = async ()=>{

  let sites = await scraper.scrape(allSites.headlines_South_Africa);
  let siteHeadlines = [];

  for(let i = 0; i< sites.length; i++){
    let name = sites[i].name;
    let shortName = sites[i].shortName;

    let selector = selectorList.selectors_Headlines_South_Africa[shortName];

    let regularHeadlines = await extractSelectors.extract(selector ,sites[i]['data']);

    regularHeadlines.forEach((headline)=>{

      siteHeadlines.push({
        org: name,
        headline: headline.title,
        link: headline.link,
        type: "headlines_South_Africa"
      })

    })

  }

  return siteHeadlines;


};

module.exports.extractHeadlines_World = async ()=>{

  let sites = await scraper.scrape(allSites.headlines_World);
  //console.log(sites);
  let siteHeadlines = [];

  for(let i = 0; i< sites.length; i++){
    let name = sites[i].name;
    let shortName = sites[i].shortName;

    let selector = selectorList.selectors_Headlines_World[shortName];

    let regularHeadlines = await extractSelectors.extract(selector ,sites[i]['data']);

    regularHeadlines.forEach((headline)=>{

      siteHeadlines.push({
        org: name,
        headline: headline.title,
        link: headline.link,
        type: "headlines_World"
      })

    })

  }

  return siteHeadlines;


};




