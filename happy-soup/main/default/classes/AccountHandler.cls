public with sharing class AccountHandler {
	public AccountHandler() {
		
	}

	public static Account insertNewAccount(String name){
		Integer y = 0;
		Y = 0;
		Account account = new Account(Name=name);
		try {
			insert account;
		}catch(DmlException e){
			System.debug(e.getMessage());
			return null;
		}

		return account;
	}
}