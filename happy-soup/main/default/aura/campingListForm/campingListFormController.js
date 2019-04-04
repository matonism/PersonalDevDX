({
	submitForm : function(component, event, helper) {
	    console.log('submit registered');
        if(helper.isValidItem(component, event, helper)){
       	    console.log('item is valid');
            var newItem = component.get("v.newItem");
            helper.createItem(component, newItem);
        }
	},
    

})