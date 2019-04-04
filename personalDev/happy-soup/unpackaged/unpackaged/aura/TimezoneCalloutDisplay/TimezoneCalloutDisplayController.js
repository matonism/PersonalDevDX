({
	getDataEnvelope : function(component, event, helper) {
		helper.getDataEnvelope(component);
	},

	addNewAddress : function(component, event, helper){
		helper.addNewAddress(component, event);
	},

	notify : function(component, event, helper){
		console.log('value changed');
	}
})