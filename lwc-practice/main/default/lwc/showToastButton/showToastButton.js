import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowToastButton extends LightningElement {
    
    connectedCallback() {

        this.parameters = this.getQueryParameters();
        console.log(this.parameters);
    }

    getQueryParameters() {

        var params = {};
        var search = location.search.substring(1);

        if (search) {
            params = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
                return key === "" ? value : decodeURIComponent(value)
            });
        }

        return params;
    }
    
    showToast(){

        const event = new ShowToastEvent({
            title: 'Toast!',
            message: 'This is Toast'
        });

        this.dispatchEvent(event);
    }

}