function(e) {
	$(this).trigger("update_types");
	$(this).trigger("_changes");
	$(this).trigger("update_tags");
	$(this).trigger("update_title");
};