public with sharing class StockDataAccessor {
	
	public static String STOCK_STATUS_RENTED = 'Rented';
	public static String STOCK_STATUS_AVAILABLE = 'Available';
	public static String STOCK_STATUS_MISSING = 'Missing';

	public List<Stock__c> queryStock(Id titleId){
		return [
			SELECT Id, Name, Status__c, DueDate__c
			FROM Stock__c
			WHERE Title__c = :titleId
		];

	}


	public void saveStock(List<Stock__c> stocks){
		upsert stocks;
	}

	public void deleteStock(List<Stock__c> stocks){
		delete stocks;
	}

}