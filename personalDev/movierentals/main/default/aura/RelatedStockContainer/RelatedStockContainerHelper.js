({
	setTitle : function(component, event, helper) {
		var channel = event.getParam("channel");
		if(channel === "HomeTitleContainer"){
			var title = event.getParam("title");
			component.set("v.title", title);
		}

	},

	requestStock : function(component, event, helper){
		var title = component.get("v.title");

		var action = component.get("c.getStockByTitleId");

		action.setParams({
			titleId: title.Id
		});

		action.setCallback(this, function(response){

			var state = response.getState();
			if(state === "SUCCESS"){
				var stocks = response.getReturnValue();
				component.set("v.stocks", stocks);
				console.log(component.get("v.stocks"));
			}else{
				console.log('Error Handled');
			}

		});

		$A.enqueueAction(action);


	}
})