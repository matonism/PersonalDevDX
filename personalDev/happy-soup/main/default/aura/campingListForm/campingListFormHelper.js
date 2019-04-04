({
    isValidItem : function(component, event, helper){
  		var isValid = true;
        
		//name, quantity, and price are all not null
        var nameField = component.find("nameField");
        var quantityField = component.find("quantityField");
        var priceField = component.find("priceField");
        
        var nameValue = nameField.get("v.value");
        var quantityValue = quantityField.get("v.value");
        var priceValue = priceField.get("v.value");
        
        if($A.util.isEmpty(nameValue) || $A.util.isEmpty(quantityValue) || $A.util.isEmpty(priceValue)){
            isValid = false;
        }
 
 		return isValid;
	},
    
    createItem : function(component, item){
        var addItemEvent = component.getEvent("addItemEv");
        addItemEvent.setParams({ "item" : item });
        addItemEvent.fire();
        
        component.set("v.newItem",{ 'sobjectType': 'Camping_Item__c',
                    'Name': '',
                    'Quantity__c': 0,
                    'Price__c': 0,
                    'Packed__c': false });
	}
    
})