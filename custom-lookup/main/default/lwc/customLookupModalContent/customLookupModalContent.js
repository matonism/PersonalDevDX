import { LightningElement, track, api, wire } from 'lwc';
import fetchLookupValuesWithWrapper from '@salesforce/apex/CustomLookupAuraService.fetchLookupValuesWithWrapper';

export default class CustomLookupModalContent extends LightningElement {
    
    //lookup input properties
    @api label;
    @api objectLabel;
    @api objectName;
    @api columnsToShow;
    @api icon;
    @api fieldLevelHelp;

    //paginator properties
    @track pageNumber = 1;
    @api pageSize = 2;
    @track totalItemCount = 0;

    //data table properties
    @track sortBy = 'CreatedDate';
    @track sortDirection;

    @track selectedRecord;

    @track searchResults = [];
    @track initComplete = false;
    @track isAscending = false;

    @api expandableSectionTitleApiName ='Name';

    @api searchKeyword;
    // get searchKeyword(){
    //     return this._searchKeyword;
    // }

    // set searchKeyword(value) {
    //     this.initComplete = false;
    //     this._searchKeyword = value;
    //     this.handleSearchKeyword(this.searchKeyword);
    // }

    get showError(){
        return this.searchResults == null || this.searchResults.length === 0;
    }
    
    get columnsString(){
        return JSON.stringify(this.columnsToShow);
    }

    get errorMessage() {
        if(this.searchResults == null){            
            return 'Something went wrong in your search.  Please contact your admin.';
        }else if(this.searchResults.length === 0){
            return 'No results for \"' + this.searchKeyword + '\" in ' + this.objectLabel + 's';
        }else{
            return '';
        }
    }

    get dataTableColumns(){
        let dataTableColumns = [];
        for(let column of this.columnsToShow){
            if(column.isDisplayable === true){

                let dataTableColumn = { 
                    label: column.key, 
                    type: 'clickableCell', 
                    sortable: column.isSortable,
                    fieldName: column.value,
                    typeAttributes: {
                        recordId : { fieldName: 'Id'},
                        value : { fieldName: column.value},
                        isClickable : column.isClickable
                    }
                };
                dataTableColumns.push(dataTableColumn);
            }
        }
        return dataTableColumns;
    }

    handleSelectedRecordId(event){
        let selectedRecordId = event.detail.recordId;
        this.selectedRecord = this.searchResults.find((record) => {
            return record.Id === selectedRecordId;
        });
        
        const selectEvent = new CustomEvent('selection', { detail: this.selectedRecord });
        this.dispatchEvent(selectEvent);
    }

    handleSelectedRecord(event){
        this.selectedRecord = event.detail
        const selectEvent = new CustomEvent('selection', { detail: this.selectedRecord });
        this.dispatchEvent(selectEvent);
    }

    handleSort(event){
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.isAscending = (this.sortDirection == 'asc');
        this.pageNumber = 1;
        //this.handleSearchKeyword(this.searchKeyword);
    }
    
    // rowSelectedAccordion(event){
    //     this.selectedRecord = event.detail.selectedRecord;
    //     const selectEvent = new CustomEvent('selection', { detail: this.selectedRecord });
    //     this.dispatchEvent(selectEvent);
    // }

	@wire(fetchLookupValuesWithWrapper, {
		objectName: '$objectName',
        columnString: '$columnsString',
		searchKey: '$searchKeyword',
        fieldToSort: '$sortBy',
        isAscending: '$isAscending',
        pageNumber: '$pageNumber'
    })
    searchResultsData({ error, data }) {
        if(data){
            this.searchResults = data.records;
            this.totalItemCount = data.totalItemCount;
            this.initComplete = true;
        }else if(error){
            this.initComplete = false;
            this.searchResults = null;
        }
    }

    // handleSearchKeyword(searchKey){
	// 	fetchLookupValuesWithWrapper({objectName: this.objectName,
    //                             columnString: JSON.stringify(this.columnsToShow),
    //                             searchKey: searchKey,
    //                             fieldToSort: this.sortBy,
    //                             isAscending: (this.sortDirection == 'asc') ? true : false,
    //                             pageNumber: this.pageNumber})
    //     .then(result => {
    //         this.searchResults = result.records;
    //         this.totalItemCount = result.totalItemCount;
    //         this.initComplete = true;
    //     })
    //     .catch(error => {
    //         this.searchResults = null;
    //     });
    // }



    handlePreviousPage() {
        this.pageNumber = this.pageNumber - 1;
        //this.handleSearchKeyword(this.searchKeyword);
    }

    handleNextPage() {
        this.pageNumber = this.pageNumber + 1;
        //this.handleSearchKeyword(this.searchKeyword);
    }

    goToFirstPage(){
        this.pageNumber = 1;
        //this.handleSearchKeyword(this.searchKeyword);
    }

    goToLastPage(){
        this.pageNumber = this.totalPages;
        //this.handleSearchKeyword(this.searchKeyword);
    }

    get totalPages() {
        return Math.ceil(this.totalItemCount / this.pageSize);
    }
}