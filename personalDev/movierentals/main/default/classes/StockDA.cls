public with sharing class StockDA {

	public List<Stock__c> queryStocksByTitleId(Id titleId) {
		return [
			SELECT Id,
				Name,
				Status__c
			FROM Stock__c
			WHERE Title__c = :titleId];
	}
}