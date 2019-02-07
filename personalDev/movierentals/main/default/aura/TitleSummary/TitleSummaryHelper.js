({
	fireSelectedTitle : function(component, event, helper) {
		var selectedTitleEvent = $A.get('e.c:EA_SelectedTitle');
		selectedTitleEvent.setParams({
			title: component.get("v.title"),
			channel: 'HomeTitleContainer'
		})
		selectedTitleEvent.fire();
	}
})