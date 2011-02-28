function(doc) {
    if (doc.doc_type=="message")
    {
		// determine type
        //should be done at parse time but anyway doc.message_type
        var type = "any"; 
		if (doc.raw_text.match(/\#offer/)) {
			type="offer";
		}
		else if (doc.raw_text.match(/\#need/)) {
			type="need";
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
                key.push(type)
                key.push(timestamp)
                // this is for finding stuff 'in location, of type z', sorted by timestamp' (or any shortening of that)
                emit(key, doc)
            });
        }
    }

}