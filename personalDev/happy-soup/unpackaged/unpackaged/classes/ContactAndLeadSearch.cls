public with sharing class ContactAndLeadSearch {
	public ContactAndLeadSearch() {
		
	}

	public static List<List<SObject>> searchContactsAndLeads(String checkString){
		List<List<SObject>> contactsAndLeads = new List<List<SObject>>();
		contactsAndLeads = [
			FIND :checkString
			IN ALL FIELDS 
			RETURNING Contact(FirstName, LastName), Lead(FirstName, LastName)
		];

		return contactsAndLeads;
	}
}