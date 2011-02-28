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
		
        var timestamp = doc.timestamp
        var key
		
        // all messages of type x 
        key = []
        key.push(type)
        key.push(timestamp)
        emit(key, doc)
    }
}