({
	retrieveAnimalWithZooInfo : function(component, event, helper) {
		var recordId = component.get("v.recordId");

		var action = component.get("c.getZooInfoFromAnimal");
		action.setParams({recordId, recordId});

		action.setCallback(this, function(response){
			var state = response.getState();
			if(state === 'SUCCESS'){
				var animal = response.getReturnValue();
				component.set('v.animal', animal);

			}else{
				var error = response.getError();
				console.log(error)
			}
		});

		$A.enqueueAction(action);
	}
})