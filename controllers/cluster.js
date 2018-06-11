/**
 * Created by ROB on 2018/05/17.
 */

const tm = require( 'text-miner' );
var nlp = require('compromise');
var salient = require('salient');

//var WordPOS = require('wordpos'),
//  wordpos = new WordPOS();

var cluster = require('set-clustering');

var stringSimilarity = require('string-similarity');

var arr= [
  "The Last Federation beginner strategy guide",

  "Exploring the universe via household chemicals",

  "Top 10 most obnoxious linkbait titles",

  "Safely dissolving the ANC",

  "Games to run on a potato computer",

 "Ubuntu quick start guide for accountants in Israel",

   "Factual mistakes in Breaking Bad",

  "Steve Jones looks at: The Last Federation",

 "Safety online: How to set up your child's laptop",

 "Good pets for your child",

 "Pirate games for children age 4 to 8"

];


const mine = (headlines) =>{



  let sets = [];
  let set = {
    headline: undefined,
    tags: [],
    tagString: undefined
  };

  let cleanedHeadlines = cleanHeadlines(arr);
  let minedArr = textMine(cleanedHeadlines);
  //let tags = buildTags(minedArr);
  let tags = altBuildTags(minedArr);

  let reunified = reunify(headlines, tags);

  let groups = doClustering(reunified);



  console.log(groups);


  //for(let i=0; i< headlines.length; i++){
  //
  //}
};

const cleanHeadlines = (headlines) => {
  let cleanedHeadlines = [];
  for(let i =0; i < headlines.length; i++){

    //let cleanHeadline = headlines[i].replace(/' |'s|:/g, " ");
    let cleanHeadline = headlines[i];
    cleanedHeadlines.push(cleanHeadline);

    //let str = headlines[i].replace(/'s/g, "");
    //headlines[i] = str;
    //str = headlines[i].replace(/' |'s/g, " ");
    //headlines[i] = str;
  }
  return cleanedHeadlines;
};

const textMine = (cleanedHeadlines) =>{
  var corpus = new tm.Corpus(cleanedHeadlines);

  corpus
    .removeNewlines()
    .trim()
    .clean()
    .removeInvalidCharacters()
    .removeInterpunctuation()
    //.toLower()
    //.removeWords( tm.STOPWORDS.EN );

  return corpus.documents;

};

const altBuildTags = (minedArr) => {
  let tagArrs = [];
  minedArr.forEach((minedObj) => {
    let tagArr = [];

    let minedStr = minedObj.text;


    //let topics = nlp(minedStr).topics().unique().data();

    if(nlp(minedStr).has('(#Person|#Place|#Organization|#Noun)')){
      tagArr = nlp(minedStr).match('(#Person|#Place|#Organization|#Noun)').unique().flatten().out('normal');
    }else if(nlp(minedStr).has('#Verb')){
      tagArr = nlp(minedStr).match('#Verb').flatten().out('normal');
    }else{
      tagArr = '';
    }

    //nlp(minedStr).match('#Noun').trim().data().forEach(noun => tagArr.push(noun.text));


   // topics.forEach((topic)=> tagArr.push(topic.text));

    tagArrs.push(tagArr);

  });
  return tagArrs;

  //console.log(nlp(minedStr).topics().data());

};

const reunify = (headlines, tags) =>{

  let units =[];

  let unit = {
    headline: undefined,
    tagStr: undefined
  };

  for(let i =0; i< headlines.length; i++){
    unit = {
      headline: headlines[i],
      tagStr: tags[i]
    };
    units.push(unit);
  }

  return units;

};

const buildTags = (minedArr) =>{
  var hmmTagger = new salient.tagging.HmmTagger();
  let tagArrs = [];
  minedArr.forEach((minedObj)=>{
    let minedStr = minedObj.text;
    console.log(minedStr);

    let tokenizedArr = minedStr.split(" ");
    let tags = hmmTagger.tag(tokenizedArr);
    console.log(tags);
    let tagArr = [];
    for(let i = 0; i< tags.length; i++){
      if(tags[i] === "PRON" || tags[i] === "NOUN" || tags[i] === "VERB"){
        tagArr.push(tokenizedArr[i]);
      }
    }
    tagArrs.push(tagArr);

  });
  return tagArrs;
};

//mine(["Samwu president clarifies issues around VBS bank loan, slams Media24", '\'Once you have the land, your problems only start\' - land beneficiary']);

const topic = (headline) =>{

  //nlp.plugin();

  let doc = nlp(headline);
  //console.log(doc.nouns().out('array'));
  //console.log(doc.topics().data());
  //console.log(doc.organizations().out('topk'));


  //wordpos.getNouns(headline, function(result){
  //  console.log(result);
  //});
  var tokenizer = new salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
  var tokenized = headline.split(" ");

  var hmmTagger = new salient.tagging.HmmTagger();
  console.log(tokenized);
  console.log(hmmTagger.tag(tokenized));


};

//mine(["SA govt agrees modest wage deal with state workers"]);

//topic("DA files court papers to remove Arthur Fraser as head of SA's prisons");



const doClustering = (headlines) =>{

  //var articles = [
  //  { title: "The Last Federation beginner strategy guide",
  //    tags: [ 'games', 'strategy', 'guide', 'the last federation' ] },
  //  { title: "Exploring the universe via household chemicals",
  //    tags: [ 'woah', 'chemistry', 'illegal' ] },
  //  { title: "Top 10 most obnoxious linkbait titles",
  //    tags: [ 'seo', 'top10', 'guide', 'internet', 'web' ] },
  //  { title: "Safely dissolving dead household pets",
  //    tags: [ 'chemistry', 'pets' ] },
  //  { title: "Games to run on a potato computer",
  //    tags: [ 'games', 'top10', 'pc' ] },
  //  { title: "Ubuntu quick start guide for accountants",
  //    tags: [ 'pc', 'linux', 'ubuntu', 'guide' ] },
  //  { title: "Factual mistakes in Breaking Bad",
  //    tags: [ 'tv series', 'science', 'chemistry' ] },
  //  { title: "Stevebob looks at: The Last Federation",
  //    tags: [ 'games', 'the last federation', 'review' ] },
  //  { title: "Safety online: How to set up your child's laptop",
  //    tags: [ 'pc', 'parenting', 'guide' ] },
  //  { title: "Good pets for your child",
  //    tags: [ 'pets', 'parenting' ] },
  //  { title: "Pirate games for children age 4 to 8",
  //    tags: [ 'games', 'parenting' ] }
  //];
  //
  //var headlines = [
  //  "The Last Federation beginner strategy guide",
  //
  //  "Exploring the universe via household chemicals",
  //
  //  "Top 10 most obnoxious linkbait titles",
  //
  //  "Safely dissolving dead household pets",
  //
  //  "Games to run on a potato computer",
  //
  // "Ubuntu quick start guide for accountants",
  //
  //   "Factual mistakes in Breaking Bad",
  //
  //  "Stevebob looks at: The Last Federation",
  //
  // "Safety online: How to set up your child's laptop",
  //
  // "Good pets for your child",
  //
  // "Pirate games for children age 4 to 8"
  //
  //];

// Base similarity on number of common tags.
//  function similarity(x, y) {
//    var score = 0;
//    x.tags.forEach(function(tx) {
//      y.tags.forEach(function(ty) {
//        if (tx == ty)
//          score += 1;
//      });
//    });
//    console.log(x + "(" + y + ")", score);
//    return score;
//  }

  function similarity(x, y) {
    return stringSimilarity.compareTwoStrings(x.tagStr,y.tagStr);
  }

  var c = cluster(headlines, similarity);

  var groups = c.similarGroups(0.4);
  //console.log(groups);
  return groups;


};

mine(arr);




