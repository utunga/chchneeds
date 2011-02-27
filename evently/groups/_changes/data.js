function(resp) {
  var groups = resp.rows.map(function(r) {
    return {
      tag : r.key,
      count : r.value
    }
  });
  groups.sort(function(a,b) {
     return b.count - a.count;
  })
  return {groups:groups};
}