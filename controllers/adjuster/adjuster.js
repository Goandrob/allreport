/**
 * Created by ROB on 2018/07/10.
 */

module.exports.adjust_Headlines_South_Africa = ()=> {


};


module.exports.adjust_Opinions_South_Africa = (items)=> {
  for (let i = 0; i < items.length; i++) {
    switch (items[i].org) {
      case "FMF":
        items[i].link = "http://www.freemarketfoundation.com" + items[i].link;
        break;
      case "Politics Web":
        items[i].link = "http://www.politicsweb.co.za" + items[i].link;
        items[i].author = items[i].author.replace(/(\t\n|\n|\t| \|)/gm,"");
        if(items[i].author === "Jerm"){
          items.splice(i, 1);
          i --;
        }
        break;
    }

  }

  return items;

};
