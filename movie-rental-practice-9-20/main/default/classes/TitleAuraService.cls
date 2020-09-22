public with sharing class TitleAuraService {
    
    @AuraEnabled
    public static List<Title__c> getLatestTitles(Integer limiter) {
        List<Title__c> titles = [
            SELECT Id, Name, Genre__c, AvailableStock__c, TotalStock__c, Is_Featured__c, Thumbnail__c
            FROM Title__c
            ORDER BY CreatedDate DESC
            LIMIT :limiter
        ];
        return titles;
    }

    @AuraEnabled
    public static List<Title__c> getOutOfStockTitles(){
        List<Title__c> titles = [
            SELECT Id, Name, Genre__c, AvailableStock__c, TotalStock__c, Is_Featured__c, Thumbnail__c
            FROM Title__c
            WHERE AvailableStock__c = 0
        ];
        return titles;
    }
}