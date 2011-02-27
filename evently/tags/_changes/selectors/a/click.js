function(e) {
	$(this).trigger("update_types");
	$(this).trigger("update_locs");
	$(this).trigger("_changes");
	$(this).trigger("update_title");
};