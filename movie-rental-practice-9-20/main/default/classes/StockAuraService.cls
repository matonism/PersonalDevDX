public with sharing class StockAuraService {

    @AuraEnabled
    public static List<Stock__c> getRelatedStock(Id titleId){
        return [
            SELECT Id, Name, Status__c 
            FROM Stock__c 
            WHERE Title__c = :titleId
        ];
    }
}
