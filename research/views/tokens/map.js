Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}
 
 
Array.prototype.count = function(obj) {
  var count = 0;
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      count++;
    }
  }
  return count;
}
 
 
function stripNonWords(w){
  return w.replace(/[^a-z\@\#\_1-9A-Z]+/ig," ");
}
 
function isValidChCh(doc) {
    var txt = doc.raw_text;
    return (doc.doc_type=="message") &&
           ((txt.indexOf("#chch") != -1) ||
            (txt.indexOf("#christchurch") != -1) ||
            (txt.indexOf("#eqnz") != -1));
}
 
map = function(doc) { 
  if (!isValidChCh(doc)) return;
  
  var body = stripNonWords(doc.raw_text).toLowerCase();
  var terms = [];
  var words = body.split(/\s+/);
 
  var i = words.length;
  while (i--) {
    var word = words[i];
    if(word.length> 2) {
      if(!terms.contains(word)) {
        terms.push(word);
          var weight = words.count(word);
          var timestamp = doc.timestamp;
          var tmp = timestamp.split("T");
          var date = tmp[0];
          var time = tmp[1];
          var hr = time.split(":")[0];
          var type = "word";
          if (word.substring(0,1)=='#') {
            type = 'tag'; 
          } else if (word.substring(0,1)=='@') {
            type = 'mention'
          }
          emit([type, word, date, hr, time, timestamp], weight);
        
      }
    }
  }
}