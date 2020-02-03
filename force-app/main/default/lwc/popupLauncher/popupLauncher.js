import { LightningElement, track } from 'lwc';

export default class PopupLauncher extends LightningElement {

    @track showModal = false;
    @track variant;

    openModal(){
        this.variant = '';
        this.template.querySelector('c-popup-modal').show();
    }
    
    openSmallModal(){
        this.variant = 'small';
        this.template.querySelector('c-popup-modal').show();
    }

    openMediumModal(){
        this.variant = 'medium';
        this.template.querySelector('c-popup-modal').show();
    }

    openLargeModal(){
        this.variant = 'large';
        this.template.querySelector('c-popup-modal').show();
    }

    closeModal(){
        this.template.querySelector('c-popup-modal').hide();
    }

    saveRecord(){
        this.template.querySelector('c-popup-contents').saveRecord();
    }
}