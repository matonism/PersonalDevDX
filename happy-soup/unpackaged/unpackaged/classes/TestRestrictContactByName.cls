@isTest
public class TestRestrictContactByName {

	@isTest static void testBlockInvalidName(){


		Contact con = new Contact(LastName = 'INVALIDNAME', FirstName = 'Valid');

		Test.startTest();
		Database.SaveResult result = Database.insert(con, false);
		Test.stopTest();

		System.assert(!result.isSuccess());
		System.assert(result.getErrors().size() > 0);
		System.assertEquals('The Last Name "' + con.LastName +'" is not allowed for DML', result.getErrors()[0].getMessage());
	}
}