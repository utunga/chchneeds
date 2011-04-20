function(e) {
    $.log("in update title");

	function getAnyTagUri(state) 
	{
		if ((state.type==undefined) && (state.loc==undefined)) 
			return "#/type/any";
		
		if ((state.type!=undefined) && (state.loc==undefined)) 
			return "#/type/" + encodeURIComponent(state.type);
		
		if ((state.type==undefined) && (state.loc!=undefined)) 
			return "#/loc/" + encodeURIComponent(state.loc);
		
		if ((state.type!=undefined) && (state.loc!=undefined)) 
			return "#/loc/" + encodeURIComponent(state.loc)+
			"/" + encodeURIComponent(state.type);
	}
	
	function getAnyLocUri(state) 
	{
		if ((state.type==undefined) && (state.tag==undefined)) 
			return "#/type/any";
		
		if ((state.type!=undefined) && (state.tag==undefined)) 
			return "#/type/" + encodeURIComponent(state.type);
		
		if ((state.type==undefined) && (state.tag!=undefined)) 
			return "#/tag/" + encodeURIComponent(state.tag);
		
		if ((state.type!=undefined) && (state.tag!=undefined)) 
			return "#/tag/" + encodeURIComponent(state.tag)+
			"/" + encodeURIComponent(state.type);
	}
	
    var state  = $$(this).app.state;
	
    if (state==undefined) {
        state = {};
	}
	
    var where_part = (state.loc == undefined) ? "" :
	 "relating to <a href='" + getAnyLocUri(state) + "'>" + state.loc + "</a> ";
	 
    var tag_part = (state.tag == undefined) ? "" :
	 "tagged with <a href='" + getAnyTagUri(state) + "'>#" + state.tag + " ";
	
	var what_part;
    switch(state.type) {
        case "offer":
            what_part = ((where_part +tag_part)=="") ?
			 "Offers of help - <i class=\"lowlight\">e.g. tagged with #offer and #eqnz</i>" :
			 "Offers of help ";
            break;
        
        case "need":
			what_part = ((where_part +tag_part)=="") ?
			 "Requests for help - <i class=\"lowlight\">e.g. tagged with #need and #eqnz</i>" :
			 "Requests for help ";
            break;
			
        case "report":
			what_part = ((where_part +tag_part)=="") ?
			 "Reports (unverified) - <i class=\"lowlight\">e.g. tagged with #report and #eqnz</i>" :
			 "Reports (unverified) ";
            break;

        default:
            what_part = ((where_part +tag_part)=="") ?
			 "Tweets tagged with #eqnz or #chch or #christchurch" :
			 "Tweets ";
            break;
			
    }
	
	$.log("title - what:" + what_part + " where:" + where_part + " tag:" + tag_part);
    return {"what":what_part,"where":where_part,"tag":tag_part};
}