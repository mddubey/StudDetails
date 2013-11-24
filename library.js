var http = require('http');
var sd = {};
sd.fs = require("fs");
var recordFileName = './record.txt';
sd.records = sd.fs.existsSync(recordFileName) && sd.fs.readFileSync(recordFileName,'utf-8')
             || '{}';
sd.records = JSON.parse(sd.records);

sd.writeData = function(text){
  sd.fs.writeFile(recordFileName,text,'utf-8');
};

sd.addDetail = function(student){
  var result = {record:{}}; 
  student.Percentage = (+parseFloat(student.Percentage).toFixed(2));
  if(sd.records.hasOwnProperty(student.RollNo)){
    result.record[student.RollNo] = sd.records[student.RollNo];
    result.message = 'Roll Number ' + student.RollNo +' Record already Exists.';
    return result;
  };
  sd.records[student.RollNo] = student;
  sd.writeData(JSON.stringify(sd.records));
  result.message = 'Record added Successfully';
  result.record[student.RollNo] = student;
  return result;
};

sd.searchRecord = function(fieldValue){
  var result = {record:{}};
  if(!sd.records.hasOwnProperty(fieldValue)){
    result.message = 'The Searched Roll number '+fieldValue+' is not present in records.';
    result.record = {};
    return result;
  };
  result.record[fieldValue] = sd.records[fieldValue];
  result.message = 'Search Sucessfull.';
  return result;
};

sd.removeRecord = function(fieldValue){
  var result = {record:{}};
  if(!sd.records.hasOwnProperty(fieldValue)){
    result.message = 'Roll number '+fieldValue+' is not present in records.';
    result.record = {};
    return result;
  } 
  result.record[fieldValue] = sd.records[fieldValue];
  delete sd.records[fieldValue];
  sd.writeData(JSON.stringify(sd.records));
  result.message = 'Record Deleted.';
  return result;
};

exports.sd = sd;