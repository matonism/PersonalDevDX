public with sharing class UserPanelDataService {

    @AuraEnabled(cacheable=true)
    public static User getUserDetails(String recordId){
        System.debug(recordId);
        return [SELECT Id, Name, Email, Job_Title__c FROM User WHERE Id =: recordId];        
    }

}
