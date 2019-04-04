({
	navigateToContactsPage : function(component) {
	    var urlEvent = $A.get("e.force:navigateToURL");
	    urlEvent.setParams({
	      "url": "https://mmatonis-dev-ed.lightning.force.com/lightning/o/Contact/list?filterName=Recent"
	    });
	    urlEvent.fire();
	},

	navigateToCalloutPage : function(component){
	    var urlEvent = $A.get("e.force:navigateToURL");
	    urlEvent.setParams({
	      "url": "/lightning/n/Callout"
	    });
	    urlEvent.fire();
	},

	printToConsole : function(component){
		// var action = component.get("c.consolePrint");

		// var message = "this is console printed";
		// action.setParams({
		// 	message: message
		// });

		// action.setCallback(this, function(response){
		// 	var state = response.getState();

		// 	if(state === "SUCCESS"){
		// 		var returnValue = response.getReturnValue();
		// 		console.log(returnValue);
		// 	}
		// });

		// $A.enqueueAction(action);
	},

	// consolePrint : function(message){
	// 	console.log(message);
	// 	return "this is the return message";
	// }

})