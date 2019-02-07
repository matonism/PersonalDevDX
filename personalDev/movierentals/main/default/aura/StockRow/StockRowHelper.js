({
	navigateToStock : function(component, event, helper) {
		var navigateToStockEvent = $A.get("e.force:navigateToSObject");
		navigateToStockEvent.setParams({
			recordId: component.get("v.stock.Id")
		});
		navigateToStockEvent.fire();
	}
})