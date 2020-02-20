import { LightningElement, api } from 'lwc';

export default class CustomLookupResult extends LightningElement {
    @api icon;
    @api record;
    @api sendObject = false;

    selectRecord(event){
        event.preventDefault();
        if(!this.sendObject) {
            const selectEvent = new CustomEvent('recordselect', {
                detail: this.record });
            this.dispatchEvent(selectEvent);
         } else {
            const testEvent = new CustomEvent('recordselect', {
                detail: this.record });
            this.dispatchEvent(testEvent);
        }
    }
}