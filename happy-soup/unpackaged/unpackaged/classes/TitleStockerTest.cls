@isTest
private class TitleStockerTest {
    

    @isTest static void doesExist(){
        Title__c title = new Title__c(Name='Zoolander');
        insert title;

        Stock__c stock = new Stock__c(Status__c = 'Available', Title__c = title.Id);
        insert stock;

        TitleStocker titleStocker;

        Test.startTest();
            titleStocker = new TitleStocker(title.Id);
        Test.stopTest();

        System.assertNotEquals(null, titleStocker, 'This should not be null.');

    }

    @isTest static void testAddStock(){
        TitleStocker stocker = new TitleStocker(null);

        Test.startTest();
            stocker.addStock();
        Test.stopTest();


        System.assertEquals(1, stocker.existingStock.size());
    }
}