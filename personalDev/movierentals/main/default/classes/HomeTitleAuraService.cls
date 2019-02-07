public with sharing class HomeTitleAuraService {

	public static TitleDA titleAccessor = new TitleDA();

	@AuraEnabled
	public static List<Title__c> getLimittedTitles(Integer limitter) {
		limitter = Integer.valueOf(limitter);
		return titleAccessor.queryLimitedTitles(limitter);
	}
}