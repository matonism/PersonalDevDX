({
	getDataEnvelope : function(component) {

		var action = component.get("c.sendDataEnvelope");

		action.setCallback(this, function(response){

			var state = response.getState();
			if(state === "SUCCESS"){
				var envelope = response.getReturnValue();
				component.set("v.locations", envelope.locations);
			}else{
				console.log('error on data load');
			}
		});

		$A.enqueueAction(action);
	}, 

	addNewAddress : function(component, event){
		var address = event.getParam("address");
		var locationList = component.get("v.locations");
		locationList.push(address);
		component.set("v.locations", locationList);
	}
})