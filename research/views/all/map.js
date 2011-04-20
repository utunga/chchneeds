map = function(doc) { 
  if (!isValidChCh(doc)) return;
  var timestamp = doc.timestamp;
  var tmp = timestamp.split("T");
  var date = tmp[0];
  var time = tmp[1];
  var hr = time.split(":")[0];
  emit([date, hr, time, timestamp], doc);
}