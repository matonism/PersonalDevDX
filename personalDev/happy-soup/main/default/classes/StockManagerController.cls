public with sharing class StockManagerController {
	
	public TitleStocker stocker{get; set;}
	private Id titleId;


	//public Title__c Title__c {get; set;}
	public StockManagerController(ApexPages.StandardController stdCon){
		titleId = stdCon.getId();
	}

	public void init() {
		stocker = new TitleStocker(titleId);
	}

	public PageReference submit(){
		try{
			stocker.saveChanges();
		}catch(Exception e){
			ApexPages.addMessages(e);
			return null;
		}

		return new PageReference('/' + titleId);
	}

}