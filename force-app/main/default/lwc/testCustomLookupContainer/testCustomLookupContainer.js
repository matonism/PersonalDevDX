import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import CONTACT_ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import CONTACT_ACCOUNT_NAME_FIELD from '@salesforce/schema/Contact.Account.Name';


export default class TestCustomLookupContainer extends LightningElement {
    @api recordId;
    @track contactRecord;
    objectLabel = 'Account';
    fields = 'Account';
    searchKeyWord = 'Account';
    columnsToShow = [
        {
            key: 'Id',
            value: 'Id',
            isClickable: true,
            isSortable: true,
        },
        {
            key: 'Name',
            value: 'Name',
            isClickable: false,
            isSortable: true,
        },
    ];

    //Gets the record at a random time so the merge fields may have been resolved before this is populated.  Must use template if:true if we're displaying these
    @wire(getRecord, {recordId: '$recordId', fields: [CONTACT_ACCOUNT_FIELD, CONTACT_ACCOUNT_NAME_FIELD]}) 
    getContactRecord({error, data}){
        this.contactRecord = data;
    }

}