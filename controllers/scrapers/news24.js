/**
 * Created by ROB on 2018/05/08.
 */
const axios = require("axios");
var cheerio = require("cheerio");

const url = "https://www.dailywire.com/";

module.exports.grab = async() =>{
  try{
    const response = await axios.get(url);
    const data = response.data;

    let $ = cheerio.load(data);
    let articles = [];

    $("h3.f-5.f-sm-l.mb-1").each(function() {

      let title = $(this).text();
      let href = $(this).children('a').attr("href");

      let article = {
        title: title,
        href: href
      };

      articles.push(article);
    });

    return articles;

  } catch(error){
    console.log(error);
  }
};
