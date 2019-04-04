import { LightningElement, api, wire, track } from 'lwc';
import Id from '@salesforce/user/Id';
import getUserDetails from '@salesforce/apex/UserPanelDataService.getUserDetails';

export default class UserDisplayPanel extends LightningElement {
    userId = Id;
    @track user;
    @track error;

    connectedCallback(){

        getUserDetails({
            recordId: this.userId
        }).then(result => {
            this.user = result;
        }).catch(error => {
            console.log(error.body.message);
            this.error = error;
        });
    }   

}