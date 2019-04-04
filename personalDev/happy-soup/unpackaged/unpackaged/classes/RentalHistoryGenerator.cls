public with sharing class RentalHistoryGenerator implements RentalGenerator {

	public List<Rental__c> createRentals(List<Stock__c> stockedItems) {
		List<Rental__c> rentals = new List<Rental__c>();

		for(Stock__c s : stockedItems){
			Rental__c rental = new Rental__c(Stock__c = s.Id);
			rentals.add(rental);
		}

		return rentals;

	}


}