const localScraper = require('./local-scraper');
const extractSelectors = require('./extract-selectors');
const selectorList = require('./selector-list');

module.exports.extractHeadlines = async ()=>{

  //let pagesObj = await localScraper.scrape();
  //let orgNames = Object.keys(pagesObj);


  let sites = await localScraper.scrape();
  let siteHeadlines = [];

  for(let i = 0; i< sites.length; i++){
    let name = sites[i].name;
    let shortName = sites[i].shortName;

    let selector = selectorList.selectors[shortName];

    let regularHeadlines = await extractSelectors.extract(selector ,sites[i]['data']);

    regularHeadlines.forEach((headline)=>{

      siteHeadlines.push({
        org: name,
        headline: headline.title,
        link: headline.link
      })

    })

  }

  //for(let i = 0; i< orgNames.length; i++){
  //    let orgName = orgNames[i];
  //
  //    let selector = selectorList.selectors[orgName];
  //
  //    let frontPageHeadlines = await extractSelectors.extract(selector ,pagesObj[orgName]);
  //
  //    frontPageHeadlines.forEach((headline)=>{
  //
  //      siteHeadlines.push({
  //        org: orgName,
  //        headline: headline.title,
  //        link: headline.link
  //      })
  //    });
  //
  //}
  return siteHeadlines;


};

