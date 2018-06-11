/**
 * Created by ROB on 2018/06/06.
 */
const schedule = require('node-schedule');
const process = require('../process');


const rule = new schedule.RecurrenceRule();
rule.minute = [15, 45]; //every hour at 15 and 45 minutes

let scrape = schedule.scheduleJob(rule, function(){
  process.processHeadlines();
});
