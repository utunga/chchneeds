function(e) {
  $.log("in types");
  var params = e.data.args[1];
  return {
    view : "by_type",
    limit : 25,
    startkey : [params.type, {}],
    endkey : [params.type],
    reduce : false,
    descending : true,
    stale: "ok",
    type : "newRows"
  }
}
