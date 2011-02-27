function(resp) {
  function getTypeStateURI(state, type) 
  {
	if ((state.tag==undefined) && (state.loc==undefined)) 
  		return "#/type/" + encodeURIComponent(type);
	
	if ((state.tag!=undefined) && (state.loc==undefined)) 
  		return "#/tag/" + encodeURIComponent(state.tag) + 
		"/" + encodeURIComponent(type);
	
	if ((state.tag==undefined) && (state.loc!=undefined)) 
  		return "#/loc/" + encodeURIComponent(loc) +
		"/" + encodeURIComponent(type);

	if ((state.tag!=undefined) && (state.loc!=undefined)) 
  		return "#/loc/" + encodeURIComponent(state.loc)+
		"/" + encodeURIComponent(type) +
		"/" + encodeURIComponent(state.tag);
  }
  
  state = $$(this).app.state;
  
  $.log("in type render");
  
  $.log("in type render : state.loc= " + state.loc);
  $.log("in type render : state.tag= " + state.tag);
  $.log("in type render : state.type= " + state.type);
  curr_type = ((state.type == undefined) ? "any" : state.type);
  
  return {types:[
		{
		 name:"Offers",
		 type:"offer",
		 state_uri: getTypeStateURI(state,"offer"),
		 class_str: (("offer"==curr_type) ? "class='current'" : "")
		},
		{
	     name:"Needs",
		 type:"need",
		 state_uri: getTypeStateURI(state,"need"),
		 class_str: (("need"==curr_type) ? "class='current'" : "")
		},
		{
		 name:"Anything",
		 type:"any",
		 state_uri: getTypeStateURI(state,"any"),
		 class_str: (("any"==curr_type) ? "class='current'" : "")
		},
		]};
}