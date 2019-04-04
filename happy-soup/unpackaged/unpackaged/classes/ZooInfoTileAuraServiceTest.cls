@isTest
private class ZooInfoTileAuraServiceTest {
	
	@isTest static void getZooInfoFromAnimalTest_giveAnimalId_receiveAnimalRecord(){
		
		ZooInfoTileAuraService.da = new AnimalDAMock();

		Test.startTest();
		Animal__c a = ZooInfoTileAuraService.getZooInfoFromAnimal(null);
		Test.stopTest();

		System.assertEquals(a != null, true, 'An animal was returned');
	}
	
}