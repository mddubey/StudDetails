var http = require('http');
var sd = {};
sd.fs = require("fs");
var message_html = sd.fs.readFileSync('./public/message.html','utf-8');
var recordFileName = './record.txt';

sd.records = sd.fs.existsSync(recordFileName) && sd.fs.readFileSync(recordFileName,'utf-8')
             || '{}';
sd.records = JSON.parse(sd.records);

sd.writeData = function(text){
  sd.fs.writeFile(recordFileName,text,'utf-8');
}
sd.addDetail = function(details){
  var result = {record:{}}; 
  details.Percentage = (+parseFloat(details.Percentage).toFixed(2));
  if(sd.records.hasOwnProperty(details.RollNo)){
    result.record[details.RollNo] = sd.records[details.RollNo];
    result.message = 'Roll Number ' + details.RollNo +' Record already Exists.';
    return result;
  }
  sd.records[details.RollNo] = details;
  text = JSON.stringify(sd.records);
  sd.writeData(text);
  result.message = 'Record added Successfully';
  result.record[details.RollNo] = details;
  return result;
};

var getFieldRecords = function(result,text){
  var index = 0;
  return function(fields){
    result[index] = '<tr><td>' + text[fields].RollNo+'</td><td>'+
    text[fields].Name+'</td><td>'+
    text[fields].Percentage+'%</td></tr>';
    index++;
  };
};
sd.list = function(text){
  if(text == '{}') 
    return message_html.replace(/{message}/,'<h1>No student records available in Database.<h1/>');
  keysInRecord = Object.keys(JSON.parse(text));
  var text = JSON.parse(text);
  var result = [];
  keysInRecord.forEach(getFieldRecords(result,text));
  var temp = result.join('');
  return list_html.replace(/{list}/,temp);
};

sd.searchRecord = function(record,fieldValue){
  var result = {record:{}};
  if(!record.hasOwnProperty(fieldValue)){
    result.message = 'Search Failed... Roll number '+fieldValue+' is not present in records.';
    result.record = {};
    return result;
  };
  result.record[fieldValue] = record[fieldValue];
  result.message = 'Search Sucessfull.';
  return result;
};

sd.removeRecord = function(record,fieldValue){
  var result = {record:{}};
  if(!record.hasOwnProperty(fieldValue)){
    result.message = 'Deletion Failed... Roll number '+fieldValue+' is not present in records.';
    result.record = {};
    return result;
  } 
  result.record[fieldValue] = record[fieldValue];
  delete record[fieldValue];
  sd.records = record;
  sd.writeData(JSON.stringify(record));
  result.message = 'Record Deleted.';
  return result;
};

exports.sd = sd;