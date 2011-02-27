function(doc) {
    if (doc.doc_type=="message")
    {
        var tags = []
        var type = doc.message_type
        var timestamp = doc.timestamp
        var key
        for(var idx in doc.tags) {
        
            if (doc.tags[idx].type=='group') {  
                key = []
                key.push(doc.tags[idx].tag)
                key.push(timestamp)
                emit(key, 1)
            }
        }
    }
}