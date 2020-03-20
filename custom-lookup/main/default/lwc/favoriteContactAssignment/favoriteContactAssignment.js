import { LightningElement, api, track, wire } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';

import ACCOUNT_FAVORITE_CONTACT_FIELD from '@salesforce/schema/Account.Favorite_Contact__c';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';

export default class FavoriteContactAssignment extends LightningElement {
    @api recordId;
    @track accountRecord
    @track favoriteContact;
    @track contactId;

    //Gets the record at a random time so the merge fields may have been resolved before this is populated.  Must use template if:true if we're displaying these
    @wire(getRecord, {recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD, ACCOUNT_FAVORITE_CONTACT_FIELD]}) 
    getAccountRecord({error, data}){
        if(!!data){

            let tempAccount = {Id: this.recordId};
            Object.keys(data.fields).forEach((field) => {
                tempAccount[field] = data.fields[field].value;
            });

            this.accountRecord = tempAccount;

            this.contactId = data.fields.Favorite_Contact__c.value;
        }
    }

    //TODO: allow lookup to take id for default value rather than full record
    //Gets the record at a random time so the merge fields may have been resolved before this is populated.  Must use template if:true if we're displaying these
    @wire(getRecord, {recordId: '$contactId', fields: [CONTACT_NAME_FIELD]}) 
    getContactRecord({error, data}){
        if(!!data){
            let tempContact = {Id: this.contactId};
            for(let field of Object.keys(data.fields)){
                tempContact[field] = data.fields[field].value;
            }
            this.favoriteContact = tempContact;
            
        }
    }


    columnData = [
        {
            apiName: 'Name',
            label: 'Account Name'
        },{
            apiName: 'Phone',
            label: 'Phone',
            isClickable: false,
            isDisplayable: true,
            isSearchable: false,
            isSortable: false
        }
    ];

    handleSelectedLookup(event){
        if(!!event.detail.record){
            this.accountRecord[event.detail.fieldName] = event.detail.record.Id;
        }
    }

    saveAccount(){
        console.log('saving account');
        updateRecord({fields: this.accountRecord}).then(() => {
            console.log('saved account');
        }).catch(error => {
            console.log(error.body.message);
        });
    }

}