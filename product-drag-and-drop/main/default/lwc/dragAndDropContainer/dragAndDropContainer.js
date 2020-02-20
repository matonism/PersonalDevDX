import { LightningElement, api, track } from 'lwc';

export default class DragAndDropContainer extends LightningElement {
    @api productlist = [];
    @api category;

    handleDragOver(evt) {
        evt.preventDefault();
    }

    handleDragEnter(evt) {
        evt.preventDefault();
    }

    handleItemDrag(evt) {
        const event = new CustomEvent('listitemdrag', {
            detail: evt.detail
        });

        this.dispatchEvent(event); 
    }
}