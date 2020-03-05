import { LightningElement, track, api, wire } from 'lwc';
import fetchLookUpValues from '@salesforce/apex/CustomLookupAuraService.fetchLookUpValues';

const DELAY = 300;

export default class CustomLookup extends LightningElement {

	//Used for lookup input functionality
	@api label;
	@api objectName;
	@api objectLabel;
	@api icon;
	@api orderAttribute;
	@api limitAttribute;	
	@api isRequired = false;
	@api hasError = false;
	@api errorText = 'Complete this field.';
	@api fieldLevelHelp;

	//set as api in case we want to default this value
	@api selectedRecord;

	//These are the fields that get displayed in columns and have their values checked against the search string
	//isClickable, isSortable, and isDisplayable are only relevant for the lookup modal
	@api columns = [{key: 'Name', value: 'Name', isSearchable: 'true', isClickable: 'true', isSortable: 'true', isDisplayable: 'true'}];

	//used for modal and pagination
	@api pageSize = 2;

	//used to communicate between lookup-input and modal
	@api searchKeyword = '';

	handleLookupModalClose(event){
		event.stopPropagation();
		let modal = this.template.querySelector('c-popup-modal');
		if(!!modal){
			modal.hide();
		}
	}

	handleSearchKeywordSubmission(event){
		event.stopPropagation();
		this.searchKeyword = event.detail.searchKeyword;
		let modal = this.template.querySelector('c-popup-modal');
		if(!!modal){
			modal.show();
		}
	}

	handleRecordSelection(event){
		let modal = this.template.querySelector('c-popup-modal');
		if(!!modal){
			modal.hide();
		}
		this.selectedRecord = event.detail;
	}
}