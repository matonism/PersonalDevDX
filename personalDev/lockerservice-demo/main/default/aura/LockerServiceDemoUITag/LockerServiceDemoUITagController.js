({
    checkForIds : function(component, event, helper) {
        console.log("Looking for id=namespacedDiv");
        var namespacedDiv = document.getElementById("namespacedDiv");
        console.dir(namespacedDiv);

        console.log("Looking for id=cDiv");
        var cNamespaceDiv = document.getElementById("cDiv");
        console.dir(cNamespaceDiv);

        console.log("Looking for id=separateComponentDiv");
        var cNamespaceDiv = document.getElementById("separateComponentDiv");
        console.dir(cNamespaceDiv);
    }
})
