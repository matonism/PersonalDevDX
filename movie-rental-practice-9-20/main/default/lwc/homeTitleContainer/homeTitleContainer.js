import { LightningElement, api } from 'lwc';
import getLatestTitles from '@salesforce/apex/TitleAuraService.getLatestTitles';

export default class HomeTitleContainer extends LightningElement {
    @api limit = 5;
    titles;

    connectedCallback(){
        getLatestTitles({limiter: this.limit}).then(response => {
            this.titles = response;
        }).catch((error => {
            console.log(error);
        }));
    }
}