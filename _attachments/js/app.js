//totally stupid that I have to implement this
//state parser when it should just be a property on
//pathBinder.. but can't find it so implementing a custom one
function getStateFromPath(path) 
{ 

  $.log("parsing path:" + path);
  
  var paths = path.split("/");
  loc  = undefined;
  type = undefined;
  tag  = undefined;
  
  if ((paths.length < 2) || (paths[1]==undefined))
  	return {};
	
  if (paths[1]=="type") {
	if (paths.length>2 && paths[2]!="") 
		type = paths[2];
  }
  
  if (paths[1]=="tag") {
	if (paths.length>2 && paths[2]!="") 
		tag = paths[2];
	
	if (paths.length>3 && paths[3]!="") 
		type = paths[3];
	
  }
  
  if (paths[1]=="loc") {
	if (paths.length>2 && paths[2]!="")
		loc = paths[2];
	
	if (paths.length>3 && paths[3]!="")
		type = paths[3];
	
	if (paths.length>4 && paths[4]!="")
		tag = paths[4];
	
  }
  
  if (type=="any")
  	type= undefined;
	
  if (loc=="any") 
   	loc = undefined;
	
  if (tag=="any") 
  	tag = undefined;
	
  $.log("parse finished type:" + type + " loc:" + loc + " tag:" + tag);
  return {"loc":loc,"type":type,"tag":tag};  
};

function getPath() {
	var matches = window.location.toString().match(/^[^#]*(#.+)$/);
	return matches ? matches[1] : '';
}; 

// $.couch.app() loads the design document from the server and 
// then calls our application.
$.couch.app(function(app) {  
  // An evently widget that displays a tag cloud which is updated when 
  // the underlying data changes. The code for this widget is stored 
  // in the evently/tags directory.
  $("#tags").evently("tags", app);
  
  // this is the same thing, but for a cloud of usernames
  $("#locations").evently("locations", app);

  // same again, but this time getting an idea on most popular tags   
  $("#groups").evently("groups", app);
  
  // eventlyify curr_title
  $("#types").evently("types", app);
 
   // eventlyify curr_title
  $("#curr_title").evently("curr_title", app);
  
  // now set up the main list of messages
  var tasks = app.ddoc.evently.tasks;
  // todo make a declarative trigger for this pattern
  tasks.tags = $.extend(true, {}, tasks.recent, tasks.tags);
  tasks.locations = $.extend(true, {}, tasks.recent, tasks.locations);
  tasks.types = $.extend(true, {}, tasks.recent, tasks.types);
  
  $("#tasks").evently(tasks, app);
  
  $.pathbinder.onChange(function(path) {
		app.state = getStateFromPath(getPath());
		$("#curr_title").trigger("update_title");	 
		$("#types").trigger("update_types");
		$("#tags").trigger("update_tags");
		$("#locations").trigger("update_locs");
		$("#groups").trigger("refresh");
		$("#tasks ul").trigger("refresh");
  });
  $.pathbinder.begin("/");
  
});

// todo move to a plugin somewhere
// copied to toast's $.couch.app.utils
$.linkify = function(body) {
  return body.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,function(a) {
    return '<a target="_blank" href="'+a+'">'+a+'</a>';
  }).replace(/\@([\w\-]+)/g,function(user,name) {
    return '<a href="http://twitter.com/'+ name +'">'+user+'</a>';
  }).replace(/\#([\w\-\.]+)/g,function(word,tag) {
	  return ( (tag=="eqnz" || tag=="chch" || tag=="christchurch") ?
		word :
		'<a href="#!/tag/'+encodeURIComponent(tag)+'">'+word+'</a>');
  });
};