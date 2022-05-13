angular.module("LinkManager").service("save", function() {
    return (rootFolder) => {
        //remover "parent" e "lastChildVisited"
        function replacer(key, value) {
            if(key == "parent" || key == "lastChildVisited" || key == "$$hashKey") {
                return undefined;
            }
            return value;
        }
        localStorage.setItem("lastRootFolder", JSON.stringify(rootFolder, replacer));
    }
});

angular.module("LinkManager").service("load", function(Folder) {
    return () => {
        if(localStorage.getItem("lastRootFolder")) {
            return JSON.parse(localStorage.getItem("lastRootFolder"));
        }
        return new Folder("root", []);
    }
});