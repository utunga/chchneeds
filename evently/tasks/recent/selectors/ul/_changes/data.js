function(r) {
  var v = r.value;
  var app = $$(this).app;
  return {
    avatar_url : v.created_by.profile_pic_url,
    body : $.linkify($.mustache.escape(v.raw_text)),
    name : v.created_by.provider_user_name,
    name_uri : encodeURIComponent(v.created_by.provider_user_name),
    profile_uri : v.created_by.profile_url,
    futon_path : "/_utils/document.html?"+[app.db.name,r.id].map(encodeURIComponent).join('/'),
    tweet_uri: "http://twitter.com/" + v.created_by.provider_user_name + "/status/" + v.message_pointer.message_id,
    id : encodeURIComponent(r.id),
    state : v.state,
    created_at : $.prettyDate(v.timestamp)
    // todo this should be handled in dom-land / evently
    // we can use this id as a handle for automatically updating non-top rows
    // based on changes from documents
  };
}
