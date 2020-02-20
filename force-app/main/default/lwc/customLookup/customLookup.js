import { LightningElement, track, api, wire } from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomLookupAuraService.fetchLookUpValues';

const DELAY = 300;

export default class CustomLookup extends LightningElement {
	@api label;
	@api objectName;
	@api objectLabel;
	@api icon;
	@api filter = '';
	@api orderAttribute = '';
	@api limitAttribute = '';
	@api fields = '';
	@api isRequired = false;
	@api hasError = false;
	@api errorText = 'Complete this field.';
	@api columnsToShow;
	@api sendObject = false;
	@api fieldLevelHelp;
	@api enableDefaultSearch = false;
	@api defaultSearchValue = '';
	@track columnString = '';
	@track showError = false;

	@api inModal = false;
	@track isCustomLookupModalVisible = false;
	@track soslSearchRecords = [];

	@api selectedRecord;
	@track listOfSearchRecords = [];
	@track searchKeyWord = '';
	@track isSearchKeywordLongEnough = false;

	@api isRecordSelected = false;
	@track isResultsContainerVisible = false;

	@track submittedVolunteerId;
	connectedCallback(){
		this.columnString = JSON.stringify(this.columnsToShow);
	}
	@wire(fetchLookUpValues, {
		searchKeyWord: '$searchKeyWord',
		objectName: '$objectName',
		filter: '$filter',
		fields: '$fields',
		jsonColumnData: '$columnString',
		orderBy: '$orderAttribute',
		limitString: '$limitAttribute'
	})
	listOfSearchRecords;

	@api
	setSelectedRecordFromParent(record){
		this.selectedRecord = record;
		this.isRecordSelected = true;
		this.isResultsContainerVisible = false;
	}
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
			this.blurTimeout = null;
		},
			300
		);        
	}

	handleSearchChange(event){
		window.clearTimeout(this.delayTimeout);
		const searchKey = event.target.value;
		if(searchKey.length > 1) {
			this.isSearchKeywordLongEnough = true;
		} else {
			this.isSearchKeywordLongEnough = false;
		}
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchKeyWord = searchKey;
		}, DELAY);
	}

	clear(){
		this.isRecordSelected = false;
		const clearEvent = new CustomEvent('clearrecord', {detail: this.selectedRecord});
		this.dispatchEvent(clearEvent);
	}

	handleRecordSelection(event){
		this.selectedRecord = event.detail;

		if(this.inModal) {
			const selectEvent = new CustomEvent('recordselectedinmodal', { detail: this.selectedRecord });
			this.dispatchEvent(selectEvent);
		} else {
			const selectEvent = new CustomEvent('customlookupselect', { detail: this.selectedRecord });
			this.dispatchEvent(selectEvent);
		}
		this.isRecordSelected = true;
		this.isResultsContainerVisible = false;
		this.isCustomLookupModalVisible = false;
	}

	handleSearchKeyword(){
		if(!this.inModal) {
			this.isCustomLookupModalVisible = true;
			if (!this.searchKeyWord && this.enableDefaultSearch) {
				this.searchKeyWord = this.defaultSearchValue;
			}
		} else {
			const selectEvent = new CustomEvent('rerendertable', { detail: this.searchKeyWord });
			this.dispatchEvent(selectEvent);
		}
	}

	keyCheck(event){
		if (event.which === 13 && (this.isSearchKeywordLongEnough || this.enableDefaultSearch)) {
			this.handleSearchKeyword();

		}
	}

	closeModal() {
		this.isCustomLookupModalVisible = false;
	}
}