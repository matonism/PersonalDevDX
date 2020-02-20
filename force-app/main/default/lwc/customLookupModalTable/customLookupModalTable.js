import { LightningElement, track, api } from 'lwc';
import fetchLookupValuesWithWrapper from '@salesforce/apex/CustomLookupAuraService.fetchLookupValuesWithWrapper';

export default class CustomLookupModalTable extends LightningElement {
    @api objectLabel;
    @api objectName;
    @api columnsToShow;
    @api showError = false;
    @api fields;
    @api filter;
    @api expandableSectionTitleApiName ='Name';

    @track selectedRecord;
    @track isAscending = true;
    @track fieldToSort = '';
    @track pageNumber = 1;
    @track pageSize = 2;
    @track totalItemCount = 0;
    @track searchResults = [];
    @track initComplete = false;

    @api
    get searchKeyword(){
        return this._searchKeyword;
    }

    set searchKeyword(value) {
        this.initComplete = false;
        this._searchKeyword = value;
        this.handleSearchKeyword(this.searchKeyword);
    }

    get errorMessage() {
        return 'No results for ' + this.searchKeyword + ' in ' + this.objectLabel + 's';
    }

    rowSelectedRecord(event){
        this.selectedRecord = event.detail;
        const selectEvent = new CustomEvent('selection', { detail: this.selectedRecord });
        this.dispatchEvent(selectEvent);
    }

    rowSelectedAccordion(event){
        this.selectedRecord = event.detail.selectedRecord;
        const selectEvent = new CustomEvent('selection', { detail: this.selectedRecord });
        this.dispatchEvent(selectEvent);
    }

    rerenderTableResults(event) {
        this.pageNumber = 1;
        this.searchKeyword = event.detail;
    }

    handleSearchKeyword(searchKey){
		fetchLookupValuesWithWrapper({objectName: this.objectName,
                                columnString: JSON.stringify(this.columnsToShow),
                                searchKey: searchKey,
                                fieldToSort: this.fieldToSort,
                                isAscending: this.isAscending,
                                pageNumber: this.pageNumber,
                                fields: this.fields,
                                filter: this.filter})
        .then(result => {
            if(result.records.length > 0) {
                this.searchResults = result.records;
                this.totalItemCount = result.totalItemCount;
                this.showError = false;
                this.initComplete = true;
            } else {
                this.showError = true;
            }
            if(!this.inModal) {
                this.isCustomLookupModalVisible = true;
            }
        })
        .catch(error => {
            this.showError = true;
        });
    }

    handleRecordSorting(event) {
        this.isAscending = event.detail.isAscending;
        this.fieldToSort = event.detail.fieldToSort;
        this.pageNumber = 1;
        this.handleSearchKeyword(this.searchKeyword);
    }

    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.handleSearchKeyword(this.searchKeyword);
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.handleSearchKeyword(this.searchKeyword);
    }

    goToFirstPage(){
        this.pageNumber = 1;
        this.handleSearchKeyword(this.searchKeyword);
    }

    goToLastPage(){
        this.pageNumber = this.totalPages;
        this.handleSearchKeyword(this.searchKeyword);
    }

    get totalPages() {
        return Math.ceil(this.totalItemCount / this.pageSize);
    }
}