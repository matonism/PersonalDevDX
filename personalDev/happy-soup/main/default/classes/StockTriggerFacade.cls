public with sharing class StockTriggerFacade {


	private RentalGenerator rentalGen = new RentalHistoryGenerator();
	private RentalDAO rentalAccessor = new RentalDataAccessor();

	public void saveRentalHistory(Map<Id, Stock__c> oldStockMap, List<Stock__c> updatedStock) {

		List<Stock__c> newlyRentedStock = getNewlyRentedStock(oldStockMap, updatedStock);
		List<Rental__c> rentals = rentalGen.createRentals(newlyRentedStock);
		rentalAccessor.saveRentals(rentals);
	}



	private List<Stock__c> getNewlyRentedStock(Map<Id, Stock__c> oldStockMap, List<Stock__c> updatedStock){
		List<Stock__c> newlyRentedStock = new List<Stock__c>();

		for(Stock__c stock : updatedStock){
			String oldStatus = oldStockMap.get(stock.Id).Status__c;
			String newStatus = stock.Status__c;

			if(hasBeenRented(oldStatus, newStatus)){
				newlyRentedStock.add(stock);
			}
		}

		return newlyRentedStock;
	}



	private Boolean hasBeenRented(String oldStatus, String newStatus){
		return oldStatus != StockDataAccessor.STOCK_STATUS_RENTED && newStatus == StockDataAccessor.STOCK_STATUS_RENTED;
	}
}