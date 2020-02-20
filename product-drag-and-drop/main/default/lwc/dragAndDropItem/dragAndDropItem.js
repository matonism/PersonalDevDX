import { LightningElement, api } from 'lwc';

export default class DragAndDropItem extends LightningElement {
    @api product;

    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            detail: this.product.Id
        });

        this.dispatchEvent(event);
    }
}