public with sharing class ZooInfoTileAuraService {

	public static AnimalDAInterface da = new AnimalDA();

	@AuraEnabled
	public static Animal__c getZooInfoFromAnimal(Id recordId){
		Animal__c a = da.queryAnimalByRecordId(recordId);
		return a;
	}
}