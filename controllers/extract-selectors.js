/**
 * Created by ROB on 2018/05/15.
 */
var cheerio = require("cheerio");


module.exports.extract = (selectorObj, data) =>{

  let $ = cheerio.load(data, { xmlMode: true });
  let headlines = [];
  let count = 0;

  let selectorRoot = selectorObj["root"];
  let selectorTitle = selectorObj["title"];
  let selectorLink = selectorObj["link"];
  let selectorAttr = selectorObj["attr"];

  $(selectorRoot).each(function(){

    if(count < 10){
      let title;
      let link;

      if(selectorTitle){
        title = $(this).children(selectorTitle).text();
      }else{
        title = $(this).text();
      }

      if(selectorAttr){
        link = $(this).children(selectorLink).attr(selectorAttr);
      }else{
        link = $(this).children(selectorLink).text();
      }

      let headline = {
        title: title,
        link: link
      };

      headlines.push(headline);
      count++;
    }

  });

  //$(selector).each(function() {
  //
  //  if(count < 10){
  //    let title = $(this).text();
  //
  //
  //    let href = $(this).children('a').attr("href");
  //
  //    let headline = {
  //      title: title,
  //      link: href
  //    };
  //
  //    headlines.push(headline);
  //    count++;
  //  }
  //
  //});

  return headlines;
};
