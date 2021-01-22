import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import TEMPLATE_CHANNEL_MC from '@salesforce/messageChannel/Template_Channel__c';

export default class LwcSubscriber extends LightningElement {

    pageMessage = 'LWC: No message has been received';

    @wire(MessageContext) messageContext;

    connectedCallback(){
        subscribe(
            this.messageContext,
            TEMPLATE_CHANNEL_MC,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
        this.pageMessage = message.displayMessage;
    }
}