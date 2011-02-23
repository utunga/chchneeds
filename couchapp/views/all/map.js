function(doc) {
    var type = doc.message_type
    var timestamp = doc.timestamp
    var key
   
    // all messages sorted by timestamp
    key = []
    key.push(timestamp)
    emit(key, doc)
}