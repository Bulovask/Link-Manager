angular.module("LinkManager").factory("Link", function() {
	return function(name, url, image) {
		this.type = "link";
		this.name = name;
		this.description = "";
		this.url = url;
		this.color = "#ccf";
		this.image = image;
	}
});

angular.module("LinkManager").factory("Folder", function() {
	return function(name, list=[], image) {
		this.type = "folder";
		this.name = name;
		this.description = "";
		this.referenceList = list;
		this.color = "#cfc";
		this.image = image;
	}
});