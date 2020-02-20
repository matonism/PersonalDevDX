import { LightningElement, api } from 'lwc';
import getParentAccountForContact from '@salesforce/apex/AccountNavigationButtonAuraService.GetParentAccountForContact';
import { NavigationMixin } from 'lightning/navigation';

export default class AccountNavigationButton extends NavigationMixin(LightningElement) {
    @api recordId;
    accountId;

    connectedCallback(){
        
        console.log(this.recordId);
        getParentAccountForContact({contactId: this.recordId}).then(response =>{
            console.log(JSON.stringify(response));
            this.accountId = response;
        }).catch(error => {
            console.log(JSON.parse(JSON.stringify(error)));
        })
    }

    handleNavButtonClick(){
        console.log(JSON.parse(JSON.stringify(this.accountId)));
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.accountId,
                actionName: 'view'
            }
        });
    }


}