import { LightningElement } from 'lwc';

export default class PopupContents extends LightningElement {

    hideModal(){
        this.template.querySelector('c-popup-modal').hide();
    }
}