/**
 * Created by ROB on 2018/05/15.
 */
var cheerio = require("cheerio");


module.exports.extract = (selector, data) =>{

  let $ = cheerio.load(data, { xmlMode: true });
  let headlines = [];
  let count = 0;

  $('item').each(function(){
    console.log($(this).children('title').text())
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
