/**
 * Created by ROB on 2018/05/12.
 */
const Parse = require('parse/node');
const moment = require('moment');
const storage = require('node-persist');


const APP_ID = 'wF3JVvy9hsT1pEXWiIHnqAkXEn4Qko8K2a3AOoXE';
const JAVASCRIPT_KEY = "kRvWcgI77ISxYktOXXvFe0ALUta1S618zLrina5S";
Parse.initialize(APP_ID, JAVASCRIPT_KEY);

Parse.serverURL = 'https://parseapi.back4app.com/';

const Headline = Parse.Object.extend("Headlines");

//const headline = new Headline();


module.exports.create = async(items) => {

  let headlines = [];
  let headline;

  let objArr = items.map(item => new Headline(item));

  //items.forEach((item)=>{
  //  headline = new Headline(item);
  //});
  //return Parse.Object.saveAll(objArr)

  //const item = {
  //  org: "EWN",
  //  headline: 'Gordhan appoints new interim board at Transnet',
  //  link: 'http://ewn.co.za/2018/05/14/gordhan-appoints-new-transnet-board'
  //};
  return Parse.Object.saveAll(objArr);
  //try {
  //  Parse.Object.saveAll(items, (response)=>{
  //    return response;
  //  });
  //  headline.save(item).then((response)=>{
  //    return response;
  //  });
  //  //console.log(response);
  //} catch (err) {
  //  console.log(err)
  //}

  //return headline.save(item)
  //  .then(obj => obj.toJSON())
  //  .then(headline => {
  //    console.log(headline.createdAt);
  //    //read(event.objectId);
  //  })
  //  .catch(console.error);

};



module.exports.read = () => {

  let headlineQuery = new Parse.Query(Headline);

  //let entries = [];

  var d = new Date();

  var start = new moment(d);
  start.startOf('day');

  var finish = new moment(start);
  finish.add(1, 'day');

  //Articles from today
  headlineQuery.greaterThanOrEqualTo('createdAt', start.toDate());
  headlineQuery.lessThan('createdAt', finish.toDate());
  headlineQuery.limit(500);


  return headlineQuery.find();
};


module.exports.readForCache = async() =>{


  var d = new Date();

  var start = new moment(d);
  start.startOf('day');


  var finish = new moment(start);
  finish.add(1, 'day');

  let headlineCacheQuery = new Parse.Query(Headline);
  headlineCacheQuery.greaterThanOrEqualTo('createdAt', start.toDate());
  headlineCacheQuery.lessThan('createdAt', finish.toDate());
  headlineCacheQuery.descending("createdAt");
  headlineCacheQuery.limit(40);

  return headlineCacheQuery.find();

};

module.exports.readFromCache = async(item) =>{

  try{
    await storage.init({
      dir: './.node-persist/storage',
      forgiveParseErrors: true
    });
    return await storage.getItem(item);
  }
  catch(error){
    console.log(error);
  }

};




//
//function update(id) {
//  console.info('Updating object id:', id);
//  eventQuery.first(id)
//    .then(eventToUpdate => {
//      if(eventToUpdate !== undefined) {
//        console.log('Updating event:', eventToUpdate.toJSON());
//        // Here we set the new values that need to be updated
//        eventToUpdate.set('title', 'New Title Edited');
//        eventToUpdate.set('description', 'New description');
//        // Save our retrieved object
//        eventToUpdate.save()
//          .then(eventUpdated => {
//            console.log('Updated Event', eventUpdated);
//
//            destroy(eventUpdated.id)
//          })
//          .catch(console.error);
//      }
//    })
//    .catch(console.error);
//}
//
//function destroy(id) {
//  console.info('Destroying object id', id);
//  eventQuery.first(id)
//    .then(eventToDelete => {
//      if(eventToDelete !== undefined) {
//        console.log('Event to Delete', eventToDelete.id);
//        eventToDelete.destroy()
//          .then(eventDeleted => {
//            console.log('Deleted Event', eventDeleted.id);
//          })
//          .catch(console.error)
//      }
//    });
//}
