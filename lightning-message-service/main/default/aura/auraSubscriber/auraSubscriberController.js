({
    handleMessage: function(component, event, helper) { 
        if (event != null && event.getParam("displayMessage") != null) {
            component.set("v.displayMessage", event.getParam("displayMessage"));
        }
    }

})