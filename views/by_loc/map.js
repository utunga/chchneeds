function(doc) {
    if (isValidChCh(doc))
    {
        var locs = []
        //var type = doc.message_type
        var timestamp = doc.timestamp
        var key
        for(var idx in doc.tags) {
            if (doc.tags[idx].type=='loc')
                locs.push(doc.tags[idx].tag); 
        }
        
        locs.sort()
        if (locs.indexOf("new_zealand")!=-1) {
            locs.forEach(function(loc) {
                if (loc=="new_zealand") return; //skip the unneccessary nz tag
                key = []
                key.push(loc)
                key.push(timestamp)
                emit(key, doc)
            });
        }
    }

}