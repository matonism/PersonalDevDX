({
	createItem : function(component, item) {
		var action = component.get("c.saveItem");
        action.setParams({
            "item" : item
        });
        
        action.setCallback(this, function(response){
           	var state = response.getState();
            if(state == 'SUCCESS' && component.isValid()){
                var items = component.get('v.items');
                //items.push(response.getReturnValue());
                items.push(item);
                component.set("v.items", items);
            }else{
                console.log("The error thrown: " + state);
            }
        });
        
        $A.enqueueAction(action);
	}
})