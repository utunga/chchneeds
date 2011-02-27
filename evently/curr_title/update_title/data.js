function(e) {
    $.log("update title");

	function getAnyTagUri(state) 
	{
		if ((state.type==undefined) && (state.loc==undefined)) 
			return "#/";
		
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
			return "#/";
		
		if ((state.type!=undefined) && (state.tag==undefined)) 
			return "#/type/" + encodeURIComponent(state.type);
		
		if ((state.type==undefined) && (state.tag!=undefined)) 
			return "#/tag/" + encodeURIComponent(state.tag);
		
		if ((state.type!=undefined) && (state.tag!=undefined)) 
			return "#/tag/" + encodeURIComponent(state.tag)+
			"/" + encodeURIComponent(state.type);
	}
	
    var state  = $$(this).app.state;
	$.log("state- loc:" + state.loc + " tag:" + state.tag + " type:" + state.type);

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
			 "Offers of help - <i class=\"lowlight\">i.e. tagged with #offer and #chch</i>" :
			 "Offers of help ";
            break;
        
        case "need":
			what_part = ((where_part +tag_part)=="") ?
			 "Requests for help - <i class=\"lowlight\">i.e. tagged with #need or #helpme, and #chch</i>" :
			 "Requests for help ";
            break;
        
        default:
            what_part = ((where_part +tag_part)=="") ?
			 "Tweets tagged with #eqnz or #chch or #christchurch" :
			 "Tweets ";
            break;
			
    }
	
	$.log("state- loc:" + state.loc + " tag:" + state.tag + " type:" + state.type);
	$.log("state- what:" + what_part + " where:" + where_part + " tag:" + tag_part);
    return {"what":what_part,"where":where_part,"tag":tag_part};
}