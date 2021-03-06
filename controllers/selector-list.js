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
  fox: {
    root: "item",
    title: "title",
    link: "link",
    attr: undefined
  }
};


module.exports.selectors_FactCheck_South_Africa = {
  africacheck: {
    root: ".article-content h2",
    title: undefined,
    link: "a",
    attr: "href"
  },
};

module.exports.selectors_Opinions_South_Africa = {
  fmf: {
    root: "h3.article-title",
    title: undefined,
    link: "a",
    attr: "href",
    author: {
      childSelector: undefined,
      relationMethod: "next",
      selector: "div:nth-child(2) a"
    },
  },
  politicsweb: {
    root: ".teaser-container",
    title: " div:first-child",
    link: " div:first-child a",
    attr: "href",
    author:{
      childSelector: "div:nth-child(2)"
    },
  },

};


module.exports.selectors_Opinions_World = {
  dailywire: {
    root: "item",
    title: "title",
    link: "link",
    attr: undefined,
    author:{
      childSelector: "dc\\:creator"
    },
  },
};
