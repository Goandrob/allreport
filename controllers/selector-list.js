/**
 * Created by ROB on 2018/05/15.
 */

module.exports.selectors_Headlines_South_Africa = {
  ewn: {
    root: "li article.article-short h4",
    title: undefined,
    link: "a",
    attr: "href"
  },
  news24: {
    root: "div.news_item h4.bold",
    title: undefined,
    link: "a",
    attr: "href"
  },
};

module.exports.selectors_Headlines_World = {
  bbc: {
    root: "item",
    title: "title",
    link: "link",
    attr: undefined
  },
};
