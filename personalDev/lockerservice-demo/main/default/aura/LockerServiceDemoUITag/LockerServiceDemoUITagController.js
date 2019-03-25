({
    checkForIds : function(component, event, helper) {
        console.log("Looking for id=namespacedDiv");
        var namespacedDiv = document.getElementById("namespacedDiv");
        console.dir(namespacedDiv);

        console.log("Looking for id=cDiv");
        var cNamespaceDiv = document.getElementById("cDiv");
        console.dir(cNamespaceDiv);

        console.log("Looking for id=separateComponentDiv");
        var separateComponentDiv = document.getElementById("separateComponentDiv");
        console.dir(separateComponentDiv);

        separateComponentDiv.appendChild(document.createElement(div));
    }
})
