public with sharing class AnimalDA implements AnimalDAInterface{
	
	public Animal__c queryAnimalByRecordId(Id recordId){
		try {
			Animal__c a = [
					SELECT Id,
							Name,
							Species__c,
							Zoo__c,
							Zoo__r.Admission__c,
							Zoo__r.Website__c,
							Zoo__r.Name,
							Zoo__r.Address__c
					FROM Animal__c
					WHERE Id = :recordId
					LIMIT 1
			];

			return a;
		}catch(Exception ex){
			System.debug(ex.getMessage());
			throw ex;
		}
	}
}