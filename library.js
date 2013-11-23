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
  var result = {}; 
  details.Percentage = (+parseFloat(details.Percentage).toFixed(2));
  if(sd.records.hasOwnProperty(details.RollNo)){
    result.added = sd.records[details.RollNo];
    var existRecord = sd.list(JSON.stringify(result));
    return message_html.replace(/{message}/,('<h1>'+details.RollNo+' Record already Exists. </h1>'+existRecord));
  }
  sd.records[details.RollNo] = details;
  text = JSON.stringify(sd.records);
  sd.writeData(text);
  result[details.RollNo] = details;
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
  var result = {};
  if(!record.hasOwnProperty(fieldValue))
    return message_html.replace(/{message}/,'<h1>Roll number '+fieldValue+' is not present in records.</h1>');
  result[fieldValue] = record[fieldValue];
  return result;
};

sd.removeRecord = function(record,fieldValue){
  var data = JSON.parse(record);
  var result = {};
  if(!data.hasOwnProperty(fieldValue))
    return message_html.replace(/{message}/,'<h1>Roll number '+fieldValue+' is not present in records.</h1>');
  result[fieldValue] = data[fieldValue];
  return sd.list(JSON.stringify(result));
};

exports.sd = sd;