var http = require('http');
var sd = {};
sd.fs = require("fs");
var list_html = sd.fs.readFileSync('./public/html/list.html','utf-8');
var message_html = sd.fs.readFileSync('./public/html/message.html','utf-8');
var homeTemplate = sd.fs.readFileSync('./template','utf-8');
var recordFileName = './record.txt';
sd.records = sd.fs.existsSync(recordFileName) && sd.fs.readFileSync(recordFileName,'utf-8') || '{}';
sd.records = JSON.parse(sd.records);


sd.writeData = function(text){
  sd.fs.writeFile(recordFileName,text,'utf-8');
}
sd.addDetail = function(roll,name,percentage){
  var details = {RollNo:'',Name:'',Percentage:''};
  var result = {};  
  details.RollNo = roll;
  details.Name = name || "";
  percentage = percentage || 0;
  percentage = parseFloat(percentage).toFixed(2);
  details.Percentage = +percentage;
  if(sd.records.hasOwnProperty(roll)){
    result.added = sd.records[roll];
    var existRecord = sd.list(JSON.stringify(result));
    return message_html.replace(/{message}/,('<h1>'+roll+' Record already Exists. </h1>'+existRecord));
  }
  sd.records[roll] = details;
  text = JSON.stringify(sd.records);
  sd.writeData(text);
  result.added = details;
  var msg = '<h1>Record Added Successfully.</h1>'+sd.list(JSON.stringify(result));
  return message_html.replace(/{message}/,msg);
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
  // list_html = list_html.replace(/{home}/,homeTemplate);
  return list_html.replace(/{list}/,temp);
};

sd.searchRecord = function(record,fieldValue){
  var data = JSON.parse(record);
  var result = {};
  if(!data.hasOwnProperty(fieldValue))
    return message_html.replace(/{message}/,'<h1>Roll number '+fieldValue+' is not present in records.</h1>');
  result[fieldValue] = data[fieldValue];
  return sd.list(JSON.stringify(result));
};

sd.removeRecord = function(record,fieldValue){
  var record = JSON.parse(record);
  var result = {};
  if(!record.hasOwnProperty(fieldValue)) 
    return message_html.replace(/{message}/,'<h1>Roll number '+fieldValue+' is not present in records. </h1>');
  result[fieldValue] = record[fieldValue];
  delete record[fieldValue];
  sd.records = record;
  sd.writeData(JSON.stringify(record));
  var msg = '<h1>Record Removed Successfully.</h1>'+sd.list(JSON.stringify(result));
  return message_html.replace(/{message}/,msg);
};

exports.sd = sd;