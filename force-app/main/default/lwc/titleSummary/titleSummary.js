import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class TitleSummary extends LightningElement {
    @api title;
    
    @wire(CurrentPageReference) pageRef;

    selectTitle(){
        console.log('firing title: ' + this.title.Name);
        fireEvent(this.pageRef, 'titleSelected', this.title);
    }
}