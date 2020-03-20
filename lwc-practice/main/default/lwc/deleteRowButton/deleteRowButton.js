import { LightningElement, api } from 'lwc';

export default class DeleteRowButton extends LightningElement{
    @api listItemId;

    handleDeleteClick(){
        console.log('creating event');
        let deleteEvent = new CustomEvent('deleterowclicked', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                id: this.listItemId
            }
        });
        console.log(this.listItemId);
        console.log('sending event');
        this.dispatchEvent(deleteEvent);
    }
}