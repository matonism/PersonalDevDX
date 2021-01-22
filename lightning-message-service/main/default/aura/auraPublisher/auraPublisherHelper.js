({
    sendMessage : function(component) {
        var payload = {
            displayMessage: "Sent from Aura"
        };
        component.find("templateMessageChannel").publish(payload);
    }
})
