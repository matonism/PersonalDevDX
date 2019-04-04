public interface RentalGenerator {

	List<Rental__c> createRentals(List<Stock__c> stockedItems);

}