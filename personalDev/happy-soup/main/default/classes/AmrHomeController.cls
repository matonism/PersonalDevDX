public with sharing class AmrHomeController {
	
	public List<Title__c> FeaturedTitles {get; private set;}

	public AmrHomeController() {
		
	}



	@RemoteAction
	public static String myRemoteAction() {
		return 'Some Response';
	}

	@RemoteAction
	public static List<Title__c> queryFeaturedTitles(){
		return [
			SELECT Id, Name, Description__c, Genre__c
			FROM Title__c
			WHERE Is_Featured__c = true
			ORDER BY LastModifiedDate DESC
			LIMIT 20
		];


	}


	@RemoteAction
	public static List<Schema.PicklistEntry> queryAllGenres() {

		Schema.DescribeFieldResult fieldResult = Title__c.Genre__c.getDescribe();
		return fieldResult.getPicklistValues();
	}
}