@isTest
public with sharing class CustomLookupAuraServiceTest {
	@isTest
	public static void fetchLookUpRecords_givenKeyword_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1');
		insert acc;
		List<CustomLookupAuraService.ColumnData> columns = new List<CustomLookupAuraService.ColumnData>{
			new CustomLookupAuraService.ColumnData('Name', 'Name', true, true, true, true),
			new CustomLookupAuraService.ColumnData('BillingCity', 'BillingCity', true, true, true, true)
		};
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			List<sObject> results = CustomLookupAuraService.fetchLookUpRecords('Acc', 'Account', jsonColumnData, 5);
		Test.stopTest();

		System.assertEquals(1,results.size(),'There should be an account returned');
	}

	@isTest
	public static void fetchLookUpRecords_givenNonNameSearchKeywordAndSearchableBillingCity_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1',BillingCity='Akron');
		insert acc;
		List<CustomLookupAuraService.ColumnData> columns = new List<CustomLookupAuraService.ColumnData>{
			new CustomLookupAuraService.ColumnData('Name', 'Name', true, true, true, true),
			new CustomLookupAuraService.ColumnData('BillingCity', 'BillingCity', true, true, true, true)
		};
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
		List<sObject> results = CustomLookupAuraService.fetchLookUpRecords('Akr', 'Account', jsonColumnData, 5);
		Test.stopTest();

		System.assertEquals(1,results.size(),'There should be an account returned');
	}

	@isTest
	public static void fetchLookUpRecords_givenNonNameSearchKeywordAndNonSearchableBillingCity_shouldNotReturnLookupValues(){
		Account acc = new Account(Name = 'Account1', BillingCity='Akron');
		insert acc;
		List<CustomLookupAuraService.ColumnData> columns = new List<CustomLookupAuraService.ColumnData>{
			new CustomLookupAuraService.ColumnData('Name', 'Name', true, true, true, true),
			new CustomLookupAuraService.ColumnData('BillingCity', 'BillingCity', true, true, false, true)
		};
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
		List<sObject> results = CustomLookupAuraService.fetchLookUpRecords('Akr', 'Account', jsonColumnData, 5);
		Test.stopTest();

		
		System.assertEquals(0,results.size(),'No results should be returned');
	}

	@isTest
	public static void fetchLookupRecordsForModalTable_givenKeyword_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1', BillingCity = 'Akron');
		insert acc;
		List<CustomLookupAuraService.ColumnData> columns = new List<CustomLookupAuraService.ColumnData>{
			new CustomLookupAuraService.ColumnData('Name', 'Name', true, true, true, true)
		};
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
		CustomLookupAuraService.CustomLookupTableResult results = CustomLookupAuraService.fetchLookupRecordsForModalTable('Account', jsonColumnData, 'Acc', '', '', 1, null);
		Test.stopTest();

		System.assertEquals(1,results.records.size(),'There should be an account returned');
	}


	public static void fetchLookupRecordsForModalTable_givenKeywordAndFilters_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1');
		insert acc;
		List<CustomLookupAuraService.ColumnData> columns = new List<CustomLookupAuraService.ColumnData>{
			new CustomLookupAuraService.ColumnData('Name', 'Name', true, true, true, true),
			new CustomLookupAuraService.ColumnData('BillingCity', 'BillingCity', true, true, true, true)
		};
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			CustomLookupAuraService.CustomLookupTableResult results = CustomLookupAuraService.fetchLookupRecordsForModalTable('Account', jsonColumnData, 'Acc', 'Name', 'asc', 1, 5);
		Test.stopTest();

		System.assertEquals(1,results.records.size(),'There should be an account returned');
	}

	@isTest
	public static void getDefaultRecord_giveIdAndObjectType_shouldReturnRecord(){
		Account acc = new Account(Name = 'Account1', BillingCity = 'Akron');
		insert acc;

		Test.startTest();
		Account acc2 = (Account) CustomLookupAuraService.getDefaultRecord(acc.Id, 'Account');
		Test.stopTest();

		System.assertEquals(acc.Id, acc2.Id, 'The Account returned is the desired account');
	}

}