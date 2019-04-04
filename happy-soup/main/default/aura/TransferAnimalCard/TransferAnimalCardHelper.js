({
	transferAnimal : function(component, event, helper) {
		var dataService = component.find("animalDataService");

        dataService.saveRecord($A.getCallback(function(saveResult) {

            if (saveResult.state === "SUCCESS") {
            	$A.get("e.force:closeQuickAction").fire();

            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));

            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));

            }

        }));
    },


})