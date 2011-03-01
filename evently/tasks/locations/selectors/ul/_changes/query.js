function(e) {
  
  var params = e.data.args[1];
  $.log("in locs");
  var loc = params.loc;
  var tag = params.tag;
  var type = params.type;
  $.log("in locs : loc " +loc);
  $.log("in locs : tag " + tag);
  $.log("in locs : type " +type);
//  $$(this).app.state = {"loc":loc,"tag":tag,"type":type};  

  if (type==undefined || type=="any") {
    if (tag==undefined) {
      //just location
      return {
        view : "by_loc",
        limit : 25,
        startkey : [loc, {}],
        endkey : [loc],
        reduce : false,
        descending : true,
        stale: "ok",
        type : "newRows"
      }
    }
    else {
      //location and tag
      return {
        view : "by_loc_tag",
        limit : 25,
        startkey : [loc, tag, {}],
        endkey : [loc, tag],
        reduce : false,
        descending : true,
        stale: "ok",
        type : "newRows"
      }
    }
  }
  else {
    if (tag==undefined) {
      //location and type
      return {
        view : "by_loc_type",
        limit : 25,
        startkey : [loc, type, {}],
        endkey : [loc, type],
        reduce : false,
        descending : true,
        stale: "ok",
        type : "newRows"
      }
    }
    else {
      //location and tag and type
      return {
        view : "by_loc_tag_type",
        limit : 25,
        startkey : [loc, tag, type, {}],
        endkey : [loc, tag, type],
        reduce : false,
        descending : true,
        stale: "ok",
        type : "newRows"
      }
    }
  }
}
