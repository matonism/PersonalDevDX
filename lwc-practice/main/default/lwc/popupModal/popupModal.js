import { LightningElement, api, track } from 'lwc';

const HIDDEN_CSS_CLASS = 'modal-hidden';
const BASE_MODAL_CSS = 'slds-modal slds-fade-in-open';

export default class Modal extends LightningElement {
    @track showModal = false;
    @track hasHeaderString = false;

    modalClass = BASE_MODAL_CSS;
    privateHeader;
    privateSize;
    
    @api
    get size() {
        return this.privateSize;
    }
    @api
    get header() {
        return this.privateHeader;
    }

    set size(value) {
        this.privateSize = encodeURI(value);
        this.modalClass = BASE_MODAL_CSS + ' slds-modal_' + this.privateSize;
    }
    set header(value) {
        this.privateHeader = value;
        this.hasHeaderString = value !== '';
    }


    @api show() {
        this.showModal = true;
    }

    @api hide() {
        this.showModal = false;
    }

    handleDialogClose() {
        //Let parent know that dialog is closed (mainly by that cross button) so it can set proper variables if needed
        const closedialog = new CustomEvent('closedialog');
        this.dispatchEvent(closedialog);
        this.hide();
    }

    handleSlotTaglineChange() {
        const taglineEl = this.template.querySelector('p');
        taglineEl.classList.remove(HIDDEN_CSS_CLASS);
    }

    handleSlotFooterChange() {
        const footerEl = this.template.querySelector('footer');
        footerEl.classList.remove(HIDDEN_CSS_CLASS);
    }
}