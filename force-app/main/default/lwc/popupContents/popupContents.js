import { LightningElement, api } from 'lwc';

export default class PopupContents extends LightningElement {

    
    @api
    saveRecord(){
        this.template.querySelector('lightning-record-edit-form').submit();
    }

    connectedCallback(){
        console.log('callback');
    }
    handleSuccess(event){
        const successEvent = new CustomEvent('contactcreated');
        this.dispatchEvent(successEvent);
    }

    handleError(event){
        const payload = event.detail;
        console.log(JSON.stringify(payload));
    }

    checkIfValid(event){
        console.log('in checkIfValid');
        // let valid = event.currentTarget.querySelector(".input").validity.valid;
        // console.log(valid);
        // valid = event.currentTarget.validity.valid;
        // console.log(valid);
        // let elementsToCheck = this.template.querySelector('.input');
        // let validCheckElement = elementsToCheck.find((element) => {
        //     return element.dataSet.id === event.currentTarget.dataSet.id; 
        // });
        // valid = validCheckElement.validity.valid;
        // console.log(valid);
        
    }
}