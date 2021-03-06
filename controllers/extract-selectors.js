/**
 * Created by ROB on 2018/05/15.
 */
var cheerio = require("cheerio");


module.exports.extract = (selectorObj, data) => {

  let $ = cheerio.load(data, {xmlMode: true});
  let headlines = [];
  let count = 0;

  let selectorRoot = selectorObj["root"];
  let selectorTitle = selectorObj["title"];
  let selectorLink = selectorObj["link"];
  let selectorAttr = selectorObj["attr"];
  let selectorAuthor = selectorObj["author"];

  $(selectorRoot).each(function () {

    if (count < 10) {
      let title;
      let link;
      let author;

      if (selectorTitle) {
        title = $(this).children(selectorTitle).text();
      } else {
        title = $(this).text();
      }

      if (selectorAttr) {
        link = $(this).children(selectorLink).attr(selectorAttr);
      } else {
        link = $(this).children(selectorLink).text();
      }

      let headline = {
        title: title,
        link: link
      };

      if (selectorAuthor) {
        if (selectorAuthor.childSelector) {
          author = $(this).children(selectorAuthor.childSelector).text();
        } else {
          switch (selectorAuthor.relationMethod) {
            case "next":
              author = $(this).next().find(selectorAuthor.selector).text();
              break;
          }

        }
        headline.author = author;
      }

      headlines.push(headline);
      count++;
    }

  });

  return headlines;
};
