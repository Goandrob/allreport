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
  let selectorAuthor = selectorObj["author"];

  $(selectorRoot).each(function(){

    if(count < 10){
      let title;
      let link;

      if(selectorTitle){
        title = $(this).children(selectorTitle).text();
      }else{
        //console.log($(this).children('div').length);
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

      if(selectorAuthor && selectorAuthor !== "next"){
        let author = $(this).children(selectorAuthor).text();
        headline.author = author;
      }

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
