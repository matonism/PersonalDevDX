import { LightningElement, track, api, wire } from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomLookupAuraService.fetchLookUpValues';

const DELAY = 300;

export default class CustomLookupInput extends LightningElement {
	@api label;
	@api objectName;
	@api objectLabel;
	@api icon;
	@api orderAttribute = '';
	@api limitAttribute = 5;
	@api isRequired = false;
	@api hasError = false;
	@api errorText = 'Complete this field.';
	@api columnsToShow;
	@api fieldLevelHelp;
	@track columnString = '';
	@track showError = false;

	@api selectedRecord;
	@track listOfSearchRecords = [];
	@api searchKeyword = '';
	@track isSearchKeywordLongEnough = false;

	@track isResultsContainerVisible = false;

	@track submittedVolunteerId;
	connectedCallback(){
		this.columnString = JSON.stringify(this.columnsToShow);
	}
	@wire(fetchLookUpValues, {
		searchKeyword: '$searchKeyword',
		objectName: '$objectName',
		jsonColumnData: '$columnString',
		orderBy: '$orderAttribute',
		limitString: '$limitAttribute'
	})
	listOfSearchRecords;
	
	handleFocus(){
		this.isResultsContainerVisible = true;
	}

	get inputClass() {
		return this.hasError ? 'hasError' : '';
	}

	get hasLabel() {
		if(this.label) {
			return true;
		}
		return false;
	}

	handleBlur(){
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.blurTimeout = window.setTimeout(() => {
			this.isResultsContainerVisible = false;
		}, DELAY );        
	}

	handleSearchChange(event){
		window.clearTimeout(this.delayTimeout);
		const searchKey = event.target.value;
		this.isSearchKeywordLongEnough = searchKey.length > 1;

		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchKeyword = searchKey;
		}, DELAY);
	}

	clear(){
		const clearEvent = new CustomEvent('selection', {detail: null});
		this.dispatchEvent(clearEvent);
	}

	handleRecordSelection(event){
		this.selectedRecord = event.detail;

		const selectEvent = new CustomEvent('customlookupselect', { 
			bubbles: true,
			cancelable: true,
			composed: true,
			detail: this.selectedRecord 
		});
		this.dispatchEvent(selectEvent);

		this.isResultsContainerVisible = false;
		this.closeModal();
	}

	handleSearchKeywordSubmit(){
		this.isResultsContainerVisible = false;
		let event = new CustomEvent('searchkeywordsubmit', {
			detail: {searchKeyword: this.searchKeyword},
            bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	closeModal() {
		let event = new CustomEvent('lookupmodalclose', {
            bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	keyCheck(event){
		if (event.which === 13 && this.isSearchKeywordLongEnough) {
			this.handleSearchKeywordSubmit();
		}
	}
}