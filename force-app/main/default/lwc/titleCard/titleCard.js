import { LightningElement, api, track } from 'lwc';

export default class TitleCard extends LightningElement {
    @api title;
    @track stockLabel;
    
    connectedCallback(){
        this.stockLabel = 'Available Stock: ' + this.title.AvailableStock__c + '/' + this.title.TotalStock__c;
    }
}