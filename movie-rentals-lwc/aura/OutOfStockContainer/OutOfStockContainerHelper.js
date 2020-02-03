({
    getTitles : function(component) {
        var action = component.get("c.getOutOfStockTitles");
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                component.set("v.titles", response.getReturnValue());
                console.log(response.getReturnValue());

            }else if(response.getState() == 'ERROR'){
                console.log(response.getError());
            }
        });

        $A.enqueueAction(action);
    }
})
