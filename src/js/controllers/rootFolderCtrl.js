angular.module("LinkManager").controller("rootFolderCtrl", function($scope, Link, Folder) {
	//object-list-container
	$scope.tree = new Folder("root", []);
	$scope.path = [$scope.tree];
	$scope.currentFolder = $scope.tree;
	
	$scope.itemAction = (item, index) => {
		switch(item.type) {
			case "link":
				if(item.url) window.open(item.url, "_blank");
				else alert("Link Vazio");
			break;
			case "folder":
				item.parent = $scope.currentFolder;
				$scope.currentFolder = item;
				$scope.path.push(item);
			break;
		}
	}
	
	$scope.back = () => {
		if($scope.currentFolder.parent) {
			$scope.currentFolder.parent.lastChildVisited = $scope.currentFolder;
			$scope.currentFolder = $scope.currentFolder.parent;
			$scope.path.pop();
		}
	}
	
	$scope.next = () => {
		if($scope.currentFolder.lastChildVisited) {
			$scope.currentFolder = $scope.currentFolder.lastChildVisited;
			$scope.path.push($scope.currentFolder);
		}
	}
	
	$scope.go = (folder, index) => {
		$scope.path.splice(index + 1);
		$scope.currentFolder = folder;
	}
	
	//new-item-container
	$scope.newItemContainerVisible = false;
	$scope.itemEdit = {};
	$scope.itemEdit.type = 'link';
	
	$scope.addItem = item => {
		let newItem;
		
		if(item.type == "link" && item.url) newItem = new Link(item.name, item.url);
		else if(item.type == "folder") newItem = new Folder(item.name, []);
		
		if(newItem && item.name) {
			$scope.currentFolder.referenceList.push(newItem);
			$scope.newItemContainerVisible = false;
			$scope.itemEdit = {};
			$scope.itemEdit.type = 'link';
			
			newItem.description = item.description;
			newItem.image = item.image;
			newItem.color = item.color ? item.color : newItem.color;
		}
	}
});