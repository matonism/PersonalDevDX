import { LightningElement, api, wire, track} from 'lwc';

export default class tableRowAccordion extends LightningElement {
    @api row;
    @api rowData;
    @track isExpanded = false;
    @api title;
    @api key;
    @api rowIndex;
    @api accordionCellClick;
    @api checkboxFieldIsNotSelectable = false;

    handleToggleExpand() {
        if(this.isExpanded) {
           this.isExpanded = false;
        } else {
            this.isExpanded = true;
        }
	}
	
	get showRow() {
		if (this.isExpanded) {
			return 'display-row';
		}
		return 'hide-row';
	}
}