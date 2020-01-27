import { LightningElement, track, wire } from 'lwc';
import getRelatedStocks from '@salesforce/apex/StockAuraService.getRelatedStocks';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class RelatedStockContainer extends LightningElement {

    @track stocks;
    @track title;
    @track selectedStockId;
    @wire(CurrentPageReference) pageRef;
    
    connectedCallback(){
        registerListener('titleSelected', this.handleTitleSelected, this);
    }

    handleTitleSelected(title){
        this.title = title;

        getRelatedStocks({titleId: title.Id}).then(response => {
            this.stocks = response;
            this.selectedStockId = null;
        }).error(err => {
            console.log(err);
        });

    }

    handleStockClicked(event){
        let stockSelected = event.detail;
        this.selectedStockId = stockSelected.Id;
    }

}