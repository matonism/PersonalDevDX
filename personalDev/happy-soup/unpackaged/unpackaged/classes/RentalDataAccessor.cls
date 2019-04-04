public with sharing class RentalDataAccessor implements RentalDAO {
	public void saveRentals(List<Rental__c> rentals) {
		upsert rentals;
	}
}