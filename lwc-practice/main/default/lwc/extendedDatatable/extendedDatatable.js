import deleteButtonMarkup from './deleteButtonMarkup.html';
import rowIndexMarkup from './rowIndexMarkup.html';
import LightningDatatable from 'lightning/datatable';

export default class ExtendedDatatable extends LightningDatatable {
    static customTypes = {
        deleteRowCell : {
            template: deleteButtonMarkup,
            typeAttributes: ['listItemId']
        },
        rowIndexCell : {
            template: rowIndexMarkup,
            typeAttributes: ['rowIndex']
        }
    }
}