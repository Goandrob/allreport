/**
 * Created by ROB on 2018/06/24.
 */
const moment = require('moment');

module.exports.addTimeStamp = (articles)=>{

  let i=0;

  while(articles[i]){
    articles[i]["timeAgo"] = moment(articles[i].createdAt).fromNow();
    i++;
  }

  return articles;

};
