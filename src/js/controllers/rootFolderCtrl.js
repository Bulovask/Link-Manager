angular.module("LinkManager").controller("rootFolderCtrl", function($scope, Link, Folder) {
	const params = new URLSearchParams(window.location.search);
	
	$scope.tree = [
		new Folder("Sites", [
			new Folder("a", [
				new Folder("b", [
					new Folder("c", [
						new Folder("d", [
							new Folder("e", [
								new Link("f")
							])
						])
					])
				])
			])
		])
	];
	
	$scope.currentFolder = $scope.tree;
	
	$scope.itemAction = (item, currentIndex) => {
		switch(item.type) {
			case "link":
				if(item.url) window.open(item.url, "_blank");
				else alert("Link Vazio");
			break;
			case "folder":
				item.parent = $scope.currentFolder;
				$scope.currentFolder = item.referenceList;
			break;
		}
	}
	
	$scope.back = () => {
		$scope.currentFolder = $scope.currentFolder.parent.referenceList;
	}
});