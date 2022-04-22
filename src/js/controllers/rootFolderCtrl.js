angular.module("LinkManager").controller("rootFolderCtrl", function($scope, Link, Folder) {
	const params = new URLSearchParams(window.location.search);
	$scope.tree = [new Link("404", "http://www.bink.com"), new Folder("Sites", [new Link("google", "https://www.google.com"), new Folder("Pasta", [new Link("fim")])])];
	$scope.pwd = params.get("pwd") || "";
	$scope.currentFolder = $scope.tree;
	if($scope.pwd != "") {
		const indexs = $scope.pwd.split("/");
		for(let i = 0; i < indexs.length; i++) {
			$scope.currentFolder = $scope.currentFolder[indexs[i]].referenceList;
		}
	}
	
	$scope.itemAction = (item, currentIndex) => {
		switch(item.type) {
			case "link":
				if(item.url) window.open(item.url, "_blank");
				else alert("Link Vazio");
			break;
			case "folder":
				const url = $scope.pwd == "" ? String("?pwd=" + currentIndex) : "?pwd=" + $scope.pwd + "/" + currentIndex;
				window.open(url, "_self");
			break;
		}
	}
});