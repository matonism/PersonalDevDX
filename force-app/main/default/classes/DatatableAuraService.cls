public with sharing class DatatableAuraService {

    @AuraEnabled
    public static List<Contact> getAllContacts(){
        return [SELECT Id, Name, Birthdate, Email, Phone FROM Contact LIMIT 5];
    }
}
