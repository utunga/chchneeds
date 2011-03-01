function(resp) {

  function getLocStateURI(state, loc) 
  {
	if ((state.type==undefined) && (state.tag==undefined)) 
  		return "#/loc/" + encodeURIComponent(loc);
	
	if ((state.type!=undefined) && (state.tag==undefined)) 
  		return "#/loc/" + encodeURIComponent(loc) + 
		"/" + encodeURIComponent(state.type);
	
	if ((state.type==undefined) && (state.tag!=undefined)) 
  		return "#/loc/" + encodeURIComponent(loc) +
		"/" + encodeURIComponent("any") +
		"/" + encodeURIComponent(state.tag);

	if ((state.type!=undefined) && (state.tag!=undefined)) 
  		return "#/loc/" + encodeURIComponent(loc)+
		"/" + encodeURIComponent(state.type) +
		"/" + encodeURIComponent(state.tag);
  }
  
  function getAnyStateUri(state) 
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
  
  state = $$(this).app.state;
  curr_location = state.loc;
  $.log("in loc render : state.loc= " + state.loc);
  $.log("in loc render : state.tag  = " + state.tag);
  
  var locations = resp.rows.map(function(r) {
    return {
      location : r.key,
      state_uri : getLocStateURI(state, r.key),
      count : r.value,
      class_str: ((r.key==curr_location) ? "class='current'" : "")
    }
  });
  
  locations.sort(function(a,b) {
     var countDiff = b.count - a.count;
     if (countDiff!=0) return countDiff; // sort by count first
     return b.location - a.location; // then by alpha (just to keep it stable)
  });
  
  locations.insertAt(0,{
	  location : "Anywhere",
      state_uri : getAnyStateUri(state),
	  count : Number.MAX_VALUE,
      class_str: ((curr_location==undefined) ? "class='current'" : "")
  }); 
  
  min_count = ((locations.length>40) ? locations[40].count : 2);
  
  locations = locations.filter(function(location) {
       return (location.count >= min_count);
  });
  
  return {locations:locations};
}