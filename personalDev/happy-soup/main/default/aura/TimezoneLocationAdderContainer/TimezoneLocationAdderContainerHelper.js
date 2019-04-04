({
	triggerLocationEvent : function(component) {
		var address = component.get("v.address");
		if(address){

			var appEvent = $A.get("e.c:TimezoneSendAddressEvent");
			appEvent.setParams({address: address});
			appEvent.fire();
			component.set("v.address", "");

		}else{
			console.log("must populate the address first");
		}

	}
})