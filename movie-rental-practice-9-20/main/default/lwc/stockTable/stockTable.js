import { LightningElement, api } from 'lwc';

export default class StockTable extends LightningElement {
    @api stocks;

    selectStock(event){
        let selectedStock = this.stocks.find((stock) => {
            return stock.Name === event.currentTarget.text;
        });

        let stockClickedEvent = new CustomEvent('stockclicked', {detail: selectedStock.Id});
        this.dispatchEvent(stockClickedEvent);
    }
    
}