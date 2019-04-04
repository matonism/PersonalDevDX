@isTest
public class TestCurrentUser {
	
	@isTest static void test_method_one() {
		System.debug('test method 1');
		Test.startTest();
		//Id userId = UserInfo.getUserId();
		String userId = UserInfo.getUserId();
		Test.stopTest();
		System.assertNotEquals(userId, null);

	}

}