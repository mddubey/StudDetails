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
  student.percentage = (+parseFloat(student.percentage).toFixed(2));
  if(sd.records.hasOwnProperty(student.rollNo)){
    result.record[student.rollNo] = sd.records[student.rollNo];
    result.message = 'Roll Number ' + student.rollNo +' Record already Exists.';
    return result;
  };
  sd.records[student.rollNo] = student;
  sd.writeData(JSON.stringify(sd.records));
  result.message = 'Record added Successfully';
  result.record[student.rollNo] = student;
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