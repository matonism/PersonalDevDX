import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import TEMPLATE_CHANNEL_MC from '@salesforce/messageChannel/Template_Channel__c';

export default class LwcPublisher extends LightningElement {

    message = 'Sent from LWC';

    @wire(MessageContext)
    messageContext;

    sendMessage(){
        const payload = {displayMessage: this.message};
        publish(this.messageContext, TEMPLATE_CHANNEL_MC, payload);
    }

}