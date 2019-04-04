public with sharing class RelatedStockAuraService {

	private static StockDA stockAccessor = new StockDA();

	@AuraEnabled
	public static List<Stock__c> getStockByTitleId(Id titleId) {
		return stockAccessor.queryStocksByTitleId(titleId);
	}
}