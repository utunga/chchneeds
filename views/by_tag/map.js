function(doc) {
    if (doc.doc_type=="message")
    {
		// determine type
        //should be done at parse time but anyway doc.message_type
        var type = "any"; 
		if (doc.raw_text.match(/\#offer/)) {
			type="offer";
		}
		else {			
			for(var idx in doc.tags) {
			   if (doc.tags[idx].type=="msg_type") continue;
			   var txt = doc.tags[idx].tag;
			   if (txt == "need" || 
				   txt == "needed" ||
				   txt == "helpme" ||
				   txt == "wanted" ||
				   txt == "want" ||
				   txt == "needs" ||
				   txt == "wanted" ) 
			   {
				   type="need";
				   break;
			   }
			   if (txt == "avail")
			   {
				   type="offer";
				   break;
			   }
			}
		}
		
        var tags = []
        var timestamp = doc.timestamp
        for(var idx in doc.tags) {
            if (doc.tags[idx].type=='tag')
			{
				var key =[];
				key.push(doc.tags[idx].tag);
				key.push(type);
				key.push(timestamp);
				emit(key, doc);
                tags.push();
			}
        }
	}
}
		/*
		        tags.sort()

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
        
        for(var i in tag_cross_join)
        {
            var tag1 = tag_cross_join[j][0]
            var tag2 = tag_cross_join[j][1]
            
            key = []
            if (tag1 == tag2)
            {
              key.push(tag1)
              key.push(null)
              key.push(type)
              key.push(timestamp)
              // messages 'tagged with tagx of type z', sorted by timestamp' (or any shortening of that)
              emit(key, doc)
            }
            if (tag1 < tag2)
            {
              key.push(tag1)
              key.push(tag2)
              key.push(type)
              key.push(timestamp)
              // messages 'tagged with tagx and tagy of type z', sorted by timestamp' (or any shortening of that)
              emit(key, doc)
            }
        }
		*/
