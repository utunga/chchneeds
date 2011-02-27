function(e) {
 
  var params = e.data.args[1];
  $.log("in tags");
  var tag = params.tag;
  var type = params.type;
  $.log("in tags : tag " + tag);
  $.log("in tags : type " +type);
  
  if (type==undefined || type=="any") {
	//just tag
	return {
		view : "by_tag",
		limit : 25,
		startkey : [tag, {}],
		endkey : [tag],
		reduce : false,
		descending : true,
		stale: "ok",
		type : "newRows"
	}
  }
  else {
	// tag and type
	return {
		view : "by_tag",
		limit : 25,
		startkey : [tag, type, {}],
		endkey : [tag, type],
		reduce : false,
		descending : true,
		stale: "ok",
		type : "newRows"
	}
  }
}
