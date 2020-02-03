import { LightningElement, api } from 'lwc';

export default class StockTable extends LightningElement {
    @api stocks;

    selectedStock(event){
        let stockId = event.currentTarget.dataset.stockId;

        let stockRecord = this.stocks.find((stock) => {
            return stock.Id === stockId;
        });

        let selectedStockEvent = new CustomEvent('stockclicked', {
            detail: stockRecord
        });

        this.dispatchEvent(selectedStockEvent);
    }
}