public class RandomContactFactory {
	public static List<Contact> generateRandomContacts(Integer numberOfContacts, String lastName) {

		List<Contact> randomContacts = new List<Contact>();
		for(Integer i = 0; i < numberOfContacts; i++){
			randomContacts.add(new Contact(FirstName = 'Test ' + i, LastName = lastName));
		}

		return randomContacts;	
	}
}