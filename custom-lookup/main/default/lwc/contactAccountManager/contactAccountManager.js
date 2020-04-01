import { LightningElement, api, wire } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_FIELD_ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';

export default class ContactAccountManager extends LightningElement {
    @api recordId;
    contact = {};
    
    columns = [
        {
            apiName: 'Name',
            label: 'Account',
            isSortable: true
        },
        {
            apiName: 'AccountNumber',
            label: 'Account Number',
            isSortable: true,
        },
        {
            apiName: 'Phone',
            label: 'Telephone',
            isClickable: false,
            isSearchable: false
        },
        {
            apiName: 'Website',
            label: 'Website',
            isClickable: false,
            isSortable: true,
        }
    ];

    @wire(getRecord, {recordId: '$recordId', fields: [CONTACT_FIELD_ACCOUNT_ID]})
    getContactRecord({error, data}){
        if(!!data){
            let tempContact = {Id: this.recordId};
            Object.keys(data.fields).forEach(field => {
                tempContact[field] = data.fields[field].value;
            });
            this.contact = tempContact;

        }else if(!!error){
            console.log(error);
        }
    }

    setAccountOnContact(event){
        console.log('Handler works');
        if(!!event.detail.record.Id){
            this.contact[event.detail.fieldName] = event.detail.record.Id;
        }else{
            this.contact[event.detail.fieldName] = null;
        }
    }

    saveRecord(){
        updateRecord({fields: this.contact})
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}