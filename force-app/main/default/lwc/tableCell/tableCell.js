import { LightningElement, api, track } from 'lwc';

export default class tableCell extends LightningElement {
    @api row;
    @api field;
    @api key;
    @api navRef;
    @api rowIndex;
    @api cellIndex;
    @api checkboxFieldIsNotSelectable = false;
    @track isCheckbox = false;
    @track isDate = false;
    @track isString = false;
    @track fieldType = '';
    @api accordionCellClick;

    connectedCallback() {
        let reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

        if(reg.test(this.field.value)){
            this.isDate = true;
        } else if(this.field.value === true || this.field.value === false) {
            this.isCheckbox = true;
        } else if(this.field.fieldType) {
            this.fieldType = this.field.fieldType;
        } else {
            this.isString = true;
        }
    }

    get isCurrency() {
        return this.fieldType === 'currency';
    }

    get isRichText() {
        return this.fieldType === 'richText'
    }

    handleCellClick() {
        this.dispatchEvent(new CustomEvent('cellselected', {
            bubbles: true,
            composed: true,
            detail: {
                rowindex:this.rowIndex,
                cellindex: this.cellIndex,
                accordionCellClick: this.accordionCellClick
            }
        }));
    }
	
	handleCellEnter(event) {
		const enterKey = 13;
		if(event.keyCode === enterKey) {
			this.handleCellClick(event);
		}
	}

    handleCheckboxClick() {
        var newFieldValue = true;
        if(this.field.value === true) {
            newFieldValue = false;
        }
        this.dispatchEvent(new CustomEvent('checkboxselected', {
            bubbles: true,
            composed: true,
            detail: {
                rowindex:this.rowIndex,
                checkboxValue: newFieldValue
            }
        }));
    }
}