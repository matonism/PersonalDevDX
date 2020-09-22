import { LightningElement, wire, track } from 'lwc';
import getRelatedStock from '@salesforce/apex/StockAuraService.getRelatedStock';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import selectedTitle from '@salesforce/messageChannel/Selected_Title__c';

export default class RelatedStockContainer extends LightningElement {

    subscription = null;
    stocks;
    title;
    @track selectedStockId;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeToSelectedTitle();
    }

    subscribeToSelectedTitle(){
        if(!this.subscription){
            this.subscription = subscribe(
                this.messageContext,
                selectedTitle,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
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