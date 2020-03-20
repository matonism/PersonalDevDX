import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import CONTACT_ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import CONTACT_ACCOUNT_NAME_FIELD from '@salesforce/schema/Contact.Account.Name';


export default class TestCustomLookupContainer extends LightningElement {

    @api recordId;
    @track contactRecord;
    
    columns = [
        {
            apiName: 'Id',
            label: 'Id',
            isClickable: true,
            isSortable: true,
            isSearchable: false,
            isDisplayable: false
        },
        {
            apiName: 'Name',
            label: 'Name',
            isClickable: true,
            isSortable: true,
            isSearchable: true,
            isDisplayable: true
        },
        {
            apiName: 'AccountNumber',
            label: 'Account Number',
            isClickable: false,
            isSortable: true,
            isSearchable: true,
            isDisplayable: true
        },
        {
            apiName: 'Phone',
            label: 'Telephone',
            isClickable: false,
            isSortable: false,
            isSearchable: false,
            isDisplayable: true
        },
        {
            apiName: 'Website',
            label: 'Website',
            isClickable: false,
            isSortable: false,
            isSearchable: true,
            isDisplayable: true
        },
        {
            apiName: 'Test_Field__c',
            label: 'Test Field'
        },
        {
            apiName: 'Favorite_Contact__r.Name',
            label: 'Favorite Contact',
            isClickable: false,
            isDisplayable: true
        }
    ];

    //Gets the record at a random time so the merge fields may have been resolved before this is populated.  Must use template if:true if we're displaying these
    @wire(getRecord, {recordId: '$recordId', fields: [CONTACT_ACCOUNT_FIELD, CONTACT_ACCOUNT_NAME_FIELD]}) 
    getContactRecord({error, data}){
        this.contactRecord = data;
    }

    handleLookupSelected(event){
        let record = event.detail.record;
        let fieldName = event.detail.fieldName;
        console.log(JSON.parse(JSON.stringify(record)));
    }

}