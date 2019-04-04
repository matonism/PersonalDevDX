public with sharing class TitleDA implements TitleDAI{

    public List<Title__c> queryLimitedTitles(Integer limitter) {
        return [
        SELECT Id,
            AvailableStock__c,
            TotalStock__c,
            Thumbnail__c,
            Genre__c,
            Name,
            Is_Featured__c
        FROM Title__c
        ORDER BY IS_Featured__c DESC
        LIMIT :limitter];
    }
}