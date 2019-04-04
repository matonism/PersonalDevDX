({
    doInit : function(component, event, helper){
        if(!!component.get("v.stocks") || component.get("v.stocks").length == 0){
            helper.requestStock(component, event, helper);
        }
    },

	handleSelectedTitle : function(component, event, helper) {
		helper.setTitle(component, event, helper);
		helper.requestStock(component, event, helper);
	}
})