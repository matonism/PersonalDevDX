/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';

export default class BaseLwcDataTable extends LightningElement {
	@api sectionHeaderText = "Section Header";
	@api columnData = [];
	@api expandableSectionTitleApiName;
	@api rowClickEnabled = false;
	@api isMultidataExpandableSectionTitle = false;
	@api checkboxFieldIsNotSelectable = false;
	@api secondExpandableSectionTitleName;
	@track rows = [];
	@track initComplete = false;
	@track selectedRecord;
	monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
	@track isAscending = true;
	@track iconName = "utility:arrowup";
	@api selectedColumn = '';

	get addCursorToRow() {
		if(this.rowClickEnabled) {
			return 'row-click';
		}
		return '';
    }

	@track initialColumnSet = false;

	renderedCallback() {
		if(!this.initialColumnSet && this.selectedColumn) {
			this.setBackground(this.selectedColumn, 'rgba(21, 137, 238, 0.3)');
		}
		this.initialColumnSet = true;
	}

	@api
	get records(){
		return this._records;
	}

    set records(value) {
		this._records = value;
        this.rows = this.createRecordMap(this.records);
		this.initComplete = true;
    }

	createRecordMap(data) {
		const recordMap = data.map(record => {
			let firstTitleValue = this.getNestedFieldValues(record,this.expandableSectionTitleApiName);
			if(this.isMultidataExpandableSectionTitle){
				let secondTitleValue = this.getNestedFieldValues(record,this.secondExpandableSectionTitleName);
				let titleName = this.checkToFormatDate(firstTitleValue) + ' - ' + this.checkToFormatDate(secondTitleValue);
				return {
					data: this.getData(record),
					expandableSectionTitle: titleName
				}
			}
			return {
				data: this.getData(record),
				expandableSectionTitle: this.checkToFormatDate(firstTitleValue)
			}
		})
		return recordMap;
	}
	
	getData(record) {
		return this.columnData.map(field => ({
			value: this.getNestedFieldValues(record,field.key),
			isClickable: field.isClickable,
			apiName:field.key,
			label: field.value,
			fieldType: field.fieldType
		}));
	}

	checkToFormatDate(value){
		let reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if(reg.test(value)){
			let dateTime = value + 'T00:00';
			let dateValue = new Date(dateTime.replace(/-/g,'/').replace('T',' ').replace(/\..*|\+.*/,""));
            return (dateValue.getMonth() + 1) + '/' + dateValue.getDate() + '/' + dateValue.getFullYear();
        } 
        return value;
	}

	getNestedFieldValues(record,key){
		var splitFields = key.split(".");
		var previousValue = record[splitFields[0]];
		for (let i=1; i<splitFields.length; i++) {
			if(previousValue !== undefined){
				previousValue = previousValue[splitFields[i]];
			}
		}
		return previousValue;
	}

	handleCellClick(event) {
		if(!this.rowClickEnabled || event.detail.accordionCellClick){
			const selectedRecord = this.records[event.detail.rowindex];
			const selectedRecordCell = this.columnData[event.detail.cellindex].key;
			this.dispatchEvent(new CustomEvent('recordselected', {
				bubbles: true,
				detail: {
					selectedRecord: selectedRecord,
					selectedRecordCell: selectedRecordCell
				}
			}));
		}
	}

    handleRowClick(event) {
        if(this.rowClickEnabled){
            const rowNumber = event.currentTarget.rowIndex;
            var selectedRecord = this.records[rowNumber - 1];
            this.dispatchEvent(new CustomEvent('rowselected', { bubbles: true, detail: selectedRecord }));
        }
	}
	
	handleRowEnter(event) {
		const enterKey = 13;
		if(event.keyCode === enterKey) {
			this.handleRowClick(event);
		}
	}

    handleCheckboxClick(event) {
        const selectedRecord = this.records[event.detail.rowindex];
		const checkboxValue = event.detail.checkboxValue;
        this.dispatchEvent(new CustomEvent('checkboxclicked', {
            bubbles: true,
            detail: {
                selectedRecord: selectedRecord,
                checkboxValue: checkboxValue
            }
        }));
    }

    updateColumnSorting(event) {
		let fieldName = event.detail.fieldToSort;
		
		if(this.selectedColumn === fieldName) {
			this.isAscending = !this.isAscending;
			this.iconName = this.isAscending ? "utility:arrowup" : "utility:arrowdown"
		} else {

			this.setBackground(this.selectedColumn, 'rgb(250, 250, 249)');
			this.setBackground(fieldName, 'rgba(21, 137, 238, 0.3)');

			this.selectedColumn = fieldName;
		}

        this.dispatchEvent(new CustomEvent('sortrecords', {
            detail: {
                fieldToSort: this.selectedColumn,
                isAscending: this.isAscending
            }
        }));
	}

	setBackground(fieldName, backgroundColor) {
		let queryName = fieldName.includes('.') ? fieldName.split('.')[0] : fieldName;

		let templateQueryString = 'th[id*=' + queryName + ']';

		let foundElems = this.template.querySelectorAll(templateQueryString);

		if (foundElems && foundElems.length > 0) {
			let foundElem = foundElems[0];
			foundElem.style.backgroundColor = backgroundColor;
		}
	}
}