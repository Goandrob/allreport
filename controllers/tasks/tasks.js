/**
 * Created by ROB on 2018/06/06.
 */
const schedule = require('node-schedule');
const process = require('../process');


const rule_Headlines = new schedule.RecurrenceRule();
rule_Headlines.minute = [19, 45]; //every hour at 15 and 45 minutes

let scrape = schedule.scheduleJob(rule_Headlines, function(){
  process.process_Headlines_South_Africa();
  process.process_Headlines_World();
  process.process_FactCheck_South_Africa();
  process.process_Opinions_South_Africa();
  process.process_Opinions_World();
});
