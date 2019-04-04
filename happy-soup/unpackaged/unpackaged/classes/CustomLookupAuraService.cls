public with sharing class CustomLookupAuraService {
	@AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchKeyWord, String objectName) {
        String searchKey = searchKeyWord + '%';
        
        List <SObject> returnList = new List <SObject> ();
      
        String query =  'SELECT Id, Name FROM ' + objectName + ' WHERE Name LIKE: searchKey ORDER BY createdDate DESC LIMIT 5';
        List <SObject> lstOfRecords = Database.query(query);
        
        for (SObject obj: lstOfRecords) {
            returnList.add(obj);
        }

        return returnList;
    }
}