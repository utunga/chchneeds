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
		 name:"#offers",
		 type:"offer",
		 state_uri: getTypeStateURI(state,"offer"),
		 li_class: "class='button mrm'",
		 a_is_current: (("offer"==curr_type) ? "class='current'" : "")
		},
		{
	     name:"#needs",
		 type:"need",
		 state_uri: getTypeStateURI(state,"need"),
		 li_class:  "class='button mrm'",
	 a_is_current: (("need"==curr_type) ? "class='current'" : "")
		},
		{
		 name:"Live Stream",
		 type:"any",
		 state_uri: getTypeStateURI(state,"any"),
		 li_class: "",
		 a_is_current: (("any"==curr_type) ? "class='current'" : "")
		},
		]};
}