public with sharing class ContactSearch {
	public ContactSearch() {
		
	}

	public static List<Contact> searchForContacts(String lastName, String postalCode){

		List<Contact> matchingContacts = new List<Contact>();

		matchingContacts = [
			SELECT ID, Name
		 	FROM Contact
		 	WHERE (LastName = :lastName) OR (MailingPostalCode = :postalCode)
		 ];
		return matchingContacts;
	}
}