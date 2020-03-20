import { LightningElement, api, track } from 'lwc';

export default class OrderModal extends LightningElement {
    @track openModal = false;
    @api productList = [];

    @api
    launchModal() {
        console.log('productList: ' + JSON.stringify(this.productList));
        this.openModal = true;
    }

    closeModal(evt) {
        this.openModal = false;
    }
}