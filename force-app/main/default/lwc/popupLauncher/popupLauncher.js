import { LightningElement, track } from 'lwc';

export default class PopupLauncher extends LightningElement {

    @track showModal = false;

    openModal(){
        console.log('attempting to show modal');
        this.template.querySelector('c-popup-modal').show();
    }
}