import { LightningElement, api } from 'lwc';

export default class TableHead extends LightningElement {
    @api column = {};
    @api iconName = "utility:arrowup";
    
    @api selectedColumn = '';

    get headerClass() {
        return this.selectedColumn === this.column.key ? 'slds-truncate selected-head sortable-column' : 'slds-truncate sortable-column';
    }

    handleClick(event) {
        this.dispatchEvent(new CustomEvent('columnselect', {
            bubbles: true,
            detail: {
                fieldToSort: this.column.key
            }
        }));
     }
}