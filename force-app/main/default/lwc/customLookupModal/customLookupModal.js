import { LightningElement, api, track } from 'lwc';

 export default class CustomLookupModal extends LightningElement {
    @api objectLabel;
    @api objectName;
    @api columnsToShow;
    @api showError;
    @api fields;
    @api searchKeyword;
    @api filter;

    @track selectedRecord;
    @track initComplete = false;

    closeModal() {
        this.dispatchEvent(new CustomEvent('cancellookupmodal'));
    }

    get headerName() {
        return this.objectLabel + ' Results';
    }

    handleRecordSelection(event){
        this.selectedRecord = event.detail;
        const selectEvent = new CustomEvent('recordselect', { detail: this.selectedRecord });
        this.dispatchEvent(selectEvent);
    }
 }