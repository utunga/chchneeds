function(resp) {
  
  function getTagStateURI(state, tag) 
  {
	if ((state.type==undefined) && (state.loc==undefined)) 
  		return "#/tag/" + encodeURIComponent(tag);
	
	if ((state.type!=undefined) && (state.loc==undefined)) 
  		return "#/tag/" + encodeURIComponent(tag) + 
		"/" + encodeURIComponent(state.type);
	
	if ((state.type==undefined) && (state.loc!=undefined)) 
  		return "#/loc/" + encodeURIComponent(state.loc) +
		"/" + encodeURIComponent("any") +
		"/" + encodeURIComponent(tag);

	if ((state.type!=undefined) && (state.loc!=undefined)) 
  		return "#/loc/" + encodeURIComponent(state.loc)+
		"/" + encodeURIComponent(state.type) +
		"/" + encodeURIComponent(tag);
  }
  
  function getAnyStateUri(state) 
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
  
  state = $$(this).app.state;
  curr_tag = state.tag;
  $.log("in tag render : state.loc= " + state.loc);
  $.log("in tag render : state.tag  = " + state.tag);
  
  var tags = resp.rows.map(function(r) {
    return {
      tag : "#" + r.key[0],
      state_uri : getTagStateURI(state, r.key[0]),
      count : r.value,
      class_str: ((r.key==curr_tag) ? "class='current'" : "")
    };
  });
  
  tags.sort(function(a,b) {
    var countDiff = b.count - a.count;
     if (countDiff!=0) return countDiff; // sort by count first
     return b.location - a.location; // then by alpha (just to keep it stable
  })
  
  tags.insertAt(0, {
	  tag : "Anything",
      state_uri : getAnyStateUri(state),
	  count : Number.MAX_VALUE,
      class_str: ((curr_tag==undefined) ? "class='current'" : "")
  }); 
  
  min_count = ((tags.length>30) ? tags[30].count : 2);
  
  tags = tags.filter(function(tag) {
       return (tag.count >= min_count);
  });
  
  return {tags:tags};
}
