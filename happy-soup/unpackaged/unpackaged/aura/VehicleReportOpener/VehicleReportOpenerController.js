({
	navigateToReport : function(component, event, helper) {
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/lightning/r/Report/00O36000007QKkSEAW/view?"
        });
        urlEvent.fire();
	}
})