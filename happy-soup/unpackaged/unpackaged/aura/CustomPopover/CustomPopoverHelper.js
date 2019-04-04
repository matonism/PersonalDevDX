({
    storePopoverSizeAndHide : function(component, event, helper){
        
        var positioning = component.get("v.positioning");

        if(!positioning){

            var modal = component.find("hover-modal");
            var hoverText = component.find("popoverAnchor").getElement();

            var referencePosition = hoverText.getBoundingClientRect();
            var popoverPosition = modal.getElement().getBoundingClientRect();

            var positioning = {
                reference : {
                    w: referencePosition.width,
                    h: referencePosition.height,
                    t: referencePosition.top,
                    b: referencePosition.bottom,
                    l: referencePosition.left,
                    r: referencePosition.right
                },
                popover : {
                    w: popoverPosition.width,
                    h: popoverPosition.height,
                    t: popoverPosition.top,
                    b: popoverPosition.bottom,
                    l: popoverPosition.left,
                    r: popoverPosition.right
                }
            }

            component.set("v.positioning", positioning);


        }else{

            var hoverText = component.find("popoverAnchor").getElement();
            var referencePosition = hoverText.getBoundingClientRect();
            if(referencePosition.left != positioning.reference.l || referencePosition.top != positioning.reference.t){
                positioning.reference.w = referencePosition.width;
                positioning.reference.h = referencePosition.height;
                positioning.reference.t = referencePosition.top;
                positioning.reference.b = referencePosition.bottom;
                positioning.reference.l = referencePosition.left;
                positioning.reference.r = referencePosition.right;
            }

            component.set("v.positioning", positioning);
        }


    },

	showModal : function(component, event, helper) {
		var modal = component.find("hover-modal");
        $A.util.removeClass(modal, 'slds-hide');

        window.setTimeout(
            $A.getCallback(function() {

                var placement = component.get("v.placement");
                // var popoverAnchor = component.get("v.popoverAnchor").getElement();
                if(placement == 'right'){
                    helper.storePopoverSizeAndHide(component, event, helper);
                    var positioning = component.get("v.positioning");

                    var modalLeft = positioning.reference.w + 15;
                    var modalTop = -25;
                    modal.getElement().style.left = modalLeft + 'px';
                    modal.getElement().style.top = modalTop + 'px';
                }else if(placement == 'left'){

                    helper.storePopoverSizeAndHide(component, event, helper);
                    var positioning = component.get("v.positioning");

                    var modalRight = -positioning.popover.w - 15;
                    var modalTop = -25;
                    modal.getElement().style.left = modalRight + 'px';
                    modal.getElement().style.top = modalTop + 'px';
                }

            }), 1
        );
        
	},

	hideModal : function(component, event, helper) {
        var hoverToClose = component.get("v.hoverToClose");
        if(!hoverToClose){
            var modal = component.find("hover-modal");
            $A.util.addClass(modal, 'slds-hide');
        }else{
            setTimeout(function(){

                var popoverHovered = component.get("v.popoverHovered");
                var showPopover = component.get("v.showPopover");

                if(!showPopover && !popoverHovered){
                    var modal = component.find("hover-modal");
                    $A.util.addClass(modal, 'slds-hide');
                }else{
                    helper.hideModal(component, event, helper);
                }

            }, 100);

        }
	},

    closePopover : function(component, event, helper){
        component.set("v.showPopover", false);
    	component.set("v.popoverHovered", false);
        var modal = component.find("hover-modal");
        $A.util.addClass(modal, 'slds-hide');
    }

})