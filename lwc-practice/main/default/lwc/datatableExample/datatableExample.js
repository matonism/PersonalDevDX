import { LightningElement, api, track } from 'lwc';
import getAllContacts from '@salesforce/apex/DatatableAuraService.getAllContacts';

const columns = [
    { label: '', type: 'rowIndexCell', fixedWidth: 60, typeAttributes: {
        rowIndex : { fieldName: 'index'}
        }
    },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Birthdate', fieldName: 'Birthdate', type: 'date' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Email', fieldName: 'Email', type: 'text' },
    { label: 'Delete', fieldName: "Id", type: 'deleteRowCell', fixedWidth: 70, typeAttributes: {
            listItemId: { fieldName: 'Id'}
        } 
    }
];

export default class DatatableExample extends LightningElement {    
    @track data = [];
    @track columns = columns;

    async connectedCallback() {
        getAllContacts().then(results => {
            this.data = this.numberRecords(results);
        }).catch(error => {
            console.log(error);
        });
    }

    numberRecords(records){
        records.forEach((record, index) => {
            record.index = index
        });
        return records;
    }

    handleDeleteRowEvent(event){
        console.log('catching ondeleterowclicked event');
        let idToDelete = event.detail.id;
        console.log('id to delete: ' + idToDelete);
        this.data = this.data.filter((record) => {
            return record.Id !== idToDelete;
        });

        this.numberRecords(this.data);
    }

}