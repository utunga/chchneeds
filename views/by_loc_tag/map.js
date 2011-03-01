function(doc) {
    if (doc.doc_type=="message")
    {
		var locs = []
        var tags = []
        //var type = doc.message_type
        var timestamp = doc.timestamp
        var key
        for(var idx in doc.tags) {
            
            if (doc.tags[idx].type=='loc')
                locs.push(doc.tags[idx].tag);
                
            if (doc.tags[idx].type=='tag')
                tags.push(doc.tags[idx].tag);
        }
        
		for(var i in locs)
        {
            for(var j in tags)
            {
                key = [];
                key.push(locs[i]);
                key.push(tags[j]);
                key.push(timestamp);
                emit(key, doc)
            }
        }	
	}
}

/*	
        tags.sort()
        locs.sort()
        
        //yeah, this does look a bit explodey, but not sure another way to do this in couchdb
        //way we do this only allows 'and' between at most 'two' tags at a time eg 'labor' and 'tools'
        //a slightly less explody version could be achieved by only emitting [b] and [a,b] and skipping [b,a] option but leave for now 
        var tag_cross_join = []
        for(var i in tags)
        {
            for(var j in tags)
            {
                tag_cross_join.push([tags[i],tags[j]]);
            }
        }
        
        for(var i in locs)
        {
            for(var j in tag_cross_join)
            {
                key = []
                key.push(locs[i])
                key.push(tag_cross_join[j][0])
                key.push(tag_cross_join[j][1])
                key.push(type)
                key.push(timestamp)
                // this is for finding stuff 'in location, with tagx and tagy of type z', sorted by timestamp' (or any shorterning of that)
                emit(key, doc)
            }
        }
    }
} */