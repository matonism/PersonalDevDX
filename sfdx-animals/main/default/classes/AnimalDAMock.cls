public with sharing class AnimalDAMock implements AnimalDAInterface{
	
	public Animal__c queryAnimalByRecordId(Id recordId){
		Animal__c a = new Animal__c(Name='Test', Species__c='Bear');
		return a;
	}
}