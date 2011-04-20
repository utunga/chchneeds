function(doc) { 
  if (!isValidChCh(doc)) return;

  var body = stripNonWords(doc.raw_text).toLowerCase();
  var test = body.indexOf("rt @");
  if (test == -1) return; //no match
  var start = test+3;
  var end = body.indexOf(" ",start);
  var retweeted = body.substring(start,end);
  
  var timestamp = doc.timestamp;
  var tmp = timestamp.split("T");
  var date = tmp[0];
  var time = tmp[1];
  var hr = time.split(":")[0];
  
  emit([retweeted, date, hr, time], doc.raw_text);

}