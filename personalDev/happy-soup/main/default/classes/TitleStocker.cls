public with sharing class TitleStocker {
    
    public List<Stock__c> existingStock {get; private set;}
    public Integer rowNumber {get; set;}

    private List<Stock__c> stockToDelete = new List<Stock__c>();
    private Id titleId;

    private StockDataAccessor stockAccessor = new StockDataAccessor();

    public TitleStocker(Id titleId) {
        this.titleId = titleId;
        this.existingStock = stockAccessor.queryStock(titleId);
    }

    public void addStock(){
        Stock__c stock = createStock();
        existingStock.add(stock);
    }

    public void removeStock(){
        if(existingStock[rowNumber].Id != null){
            stockToDelete.add(existingStock[rowNumber]);
        }

        existingStock.remove(rowNumber);

    }

    public void saveChanges(){
        stockAccessor.saveStock(existingStock);
        stockAccessor.deleteStock(stockToDelete);

    }

    private Stock__c createStock(){
        return new Stock__c(Title__c = titleId, Status__c = 'Available');
    }


}