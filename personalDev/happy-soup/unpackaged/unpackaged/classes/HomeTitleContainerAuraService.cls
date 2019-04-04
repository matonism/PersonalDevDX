public with sharing class HomeTitleContainerAuraService {
	
	@AuraEnabled
	public static List<Account> retrieveAccounts(Integer limitter){
		System.debug(limitter);
		Integer limitAccounts = Integer.valueOf(limitter);
		List<Account> accs = [SELECT Id, Name, OwnerId, Owner.Name FROM Account LIMIT :limitAccounts];
		System.debug(accs);
		return accs;
	}
}