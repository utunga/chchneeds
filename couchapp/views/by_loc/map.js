function(doc) {
    var locs = []
    var type = doc.message_type
    var timestamp = doc.timestamp
    var key
    for(var idx in doc.tags) {
        
        if (doc.tags[idx].type=='loc')
            locs.push(doc.tags[idx].tag);
            
    }
    
    locs.sort()
    
    for(var i in locs)
    {
        key = []
        key.push(locs[i])
        key.push(type)
        key.push(timestamp)
        // this is for finding stuff 'in location, of type z', sorted by timestamp' (or any shortening of that)
        emit(key, doc)
    }

}