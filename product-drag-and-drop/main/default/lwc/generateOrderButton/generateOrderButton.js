import { LightningElement } from 'lwc';

export default class GenerateOrderButton extends LightningElement { 
    doGenerateOrder(evt) {
        console.log('firing custom generateorder event');
        evt.preventDefault();
        const customEvent = new CustomEvent('generateorder', { 
            detail: evt.detail
        });
        
        this.dispatchEvent(customEvent);
    }
}