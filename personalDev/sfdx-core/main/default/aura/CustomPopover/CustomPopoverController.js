({
	togglePopover : function(component, event, helper){
        var showPopover = component.get("v.showPopover");
        if(showPopover){
            component.set("v.showPopover", false);
        }else{
            component.set("v.showPopover", true);
        }
    },

    showHidePopover : function(component, event, helper){
        var showPopover = component.get("v.showPopover");
        if(showPopover){
            helper.showModal(component, event, helper);
        }else{
            helper.hideModal(component, event, helper);
        }
    },

    positionPopover : function(component, event, helper){
        var modalShown = component.get("v.modalShown");
        if(modalShown){
    		helper.positionPopover(component, event, helper);
    	}
    },

    setPopoverHovered : function(component, event, helper){
    	if(component.get("v.hoverToOpen")){
    		component.set("v.popoverHovered", true);
    		component.set("v.showPopover", true);
    	}
    },

    setPopoverUnhovered : function(component, event, helper){
    	if(component.get("v.hoverToClose")){
    		component.set("v.popoverHovered", false);
    		component.set("v.showPopover", false);
    	}
    },

    closePopover : function(component, event, helper){
    	helper.closePopover(component, event, helper);
    }
    
	
})