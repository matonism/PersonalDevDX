import { LightningElement, wire, track } from 'lwc';
import getRelatedStock from '@salesforce/apex/StockAuraService.getRelatedStock';

import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import TITLE_SELECTED_MC from '@salesforce/messageChannel/Selected_Title__c';

export default class RelatedStockContainer extends LightningElement {

    stocks;
    title;
    @track selectedStockId;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToSelectedTitle();
    }

    subscribeToSelectedTitle(){
        subscribe(
            this.messageContext,
            TITLE_SELECTED_MC,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
        console.log('Message Received');
        this.title = message.title;
        let titleId = this.title.Id;
        getRelatedStock({titleId: titleId}).then(response => {
            this.stocks = response;
        }).catch(error => {
            console.log(error);
        })
    }

    handleStockClicked(event){
        this.selectedStockId = event.detail;
    }
}