({
	initialize : function(component,event,helper) {
		//set mehtod
		var action = component.get("c.getLimittedTitles");
		//set params
		action.setParams({
			limitter:component.get("v.limitter")
		});
		//set callbacks
		action.setCallback(this,function(response){
			var state = response.getState();
			if(state==='SUCCESS'){
				component.set("v.titles", response.getReturnValue());
			}else{
				console.log('Something happened yo!');
			}
		});
		$A.enqueueAction(action);
	}
})