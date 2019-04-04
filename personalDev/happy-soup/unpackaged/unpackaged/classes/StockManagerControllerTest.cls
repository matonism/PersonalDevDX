@isTest
private class StockManagerControllerTest {

	@isTest static void doesExist() {
		StockManagerController controller;
		Title__c title = new Title__c();
		ApexPages.StandardController stdCon = new ApexPages.StandardController(title);

		Test.startTest();
			controller = new StockManagerController(stdCon);
		Test.stopTest();

		System.assertNotEquals(null, controller);
	}

}