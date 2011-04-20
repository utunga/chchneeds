function isValidChCh(doc) {
    var txt = doc.raw_text;
    return (doc.doc_type=="message") &&
           ((txt.indexOf("#chch") != -1) ||
            (txt.indexOf("#christchurch") != -1) ||
            (txt.indexOf("#eqnz") != -1));
}

map = function(doc) {
    if (isValidChCh(doc))
    {
        var type = doc.message_type
        var timestamp = doc.timestamp
        var key
       
        // all messages sorted by timestamp
        key = []
        key.push(timestamp)
        emit(key, doc)
    }
}