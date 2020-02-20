public with sharing class AccountNavigationButtonAuraService {
    
    @AuraEnabled
    public static Id GetParentAccountForContact(Id contactId){
        Contact c = [
            SELECT AccountId 
            FROM Contact 
            WHERE Id = :contactId
            LIMIT 1
        ];

        return c.AccountId;
        
    }
}
