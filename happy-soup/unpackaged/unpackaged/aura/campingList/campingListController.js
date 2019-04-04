({
    doInit: function(component, event, helper){
        var action = component.get("c.getItems");
        action.setCallback(this, function(response){
			var state = response.getState();
            if(state = 'SUCCESS' && component.isValid()){
            	component.set("v.items", response.getReturnValue());
            } else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    handleAddItem : function(component, event, helper){
        console.log('entered handleAddItem');
		var item = event.getParam("item");
        
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
        //helper.createItem(component, item);
    }
    

})