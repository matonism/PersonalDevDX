import { LightningElement, api, track } from 'lwc';
import getLatestTitles from '@salesforce/apex/TitleAuraService.getLatestTitles';

export default class HomeTitleContainer extends LightningElement {

    @api limit = 5;

    @track titles;

    connectedCallback() {
         
        getLatestTitles({
            limiter: this.limit
        }).then(response => {
            this.titles = response;
            console.log(this.titles);
        }).catch(err => {
            console.log(err);
        });

    }

}