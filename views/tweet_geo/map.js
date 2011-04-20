function(doc) {
    if (isValidChCh(doc))
    {
		// determine type
        // should be done at first parse time
		// but as a quick hack
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
        for(var idx in doc.tags) {
            if (doc.tags[idx].type=='loc')
                locs.push(doc.tags[idx].tag); 
        }
        
        if (locs.indexOf("new_zealand")!=-1) {
            locs.forEach(function(loc) {
				if (loc == "new_zealand") return;
		
				var message_id = doc.message_pointer.message_id;
				var geo_lat = doc.location.geo_lat;
				var geo_long = doc.location.geo_long;
				var timestamp = doc.timestamp;

				var key =[];
				key.push(message_id);
				key.push(geo_lat);
				key.push(geo_long);
				key.push(type);
				key.push(timestamp);
				key.push(loc);
				emit(key,doc);
			});
		}
	}
}
