({
    getTitles : function(component, event, helper) {

        let action = component.get('c.getOutOfStockTitles');
        action.setParams({});

        action.setCallback(this, (response) => {
            if(response.getState() == 'SUCCESS'){
                component.set('v.titles', response.getReturnValue());
            }else if(response.getState() == 'ERROR'){
                console.log('error');
            }
        });

        $A.enqueueAction(action);
    }
})
