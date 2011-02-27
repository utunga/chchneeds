function(e) {
	$(this).trigger("_changes");
	$(this).trigger("update_locs");
	$(this).trigger("update_tags");
	$(this).trigger("update_title");
};