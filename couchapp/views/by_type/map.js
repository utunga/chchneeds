function(doc) {
    var type = doc.message_type
    var timestamp = doc.timestamp
    var key
    
    // all messages of type x 
    key = []
    key.push(type)
    key.push(timestamp)
    emit(key, doc)
}