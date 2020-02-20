@isTest
public with sharing class CustomLookupAuraServiceTest {
	@isTest
	public static void fetchLookUpValues_givenKeyword_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1');
		insert acc;
		List<ColumnData> columns = new List<ColumnData>();
		ColumnData data = new ColumnData();
		data.key = 'Name';
		data.value = 'Name';
		data.isSortable = true;
		data.isClickable = true;
		columns.add(data);
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			List<sObject> results = CustomLookupAuraService.fetchLookUpValues('Acc', 'Account', '', '', jsonColumnData);
		Test.stopTest();

		System.assertEquals(1,results.size(),'there should be an account returned');
	}

	@isTest
	public static void fetchLookUpValues_givenKeywordAndFilter_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1',BillingCity='Akron');
		insert acc;
		List<ColumnData> columns = new List<ColumnData>();
		ColumnData data = new ColumnData();
		data.key = 'Name';
		data.value = 'Name';
		data.isSortable = true;
		data.isClickable = true;
		columns.add(data);
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			List<sObject> results = CustomLookupAuraService.fetchLookUpValues('Acc', 'Account', ' AND BillingCity != null ', '', jsonColumnData);
		Test.stopTest();

		System.assertEquals(1,results.size(),'there should be an account returned');
	}

	@isTest
	public static void fetchLookUpValues_givenKeywordAndFields_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1',BillingCity='Akron');
		insert acc;
		List<ColumnData> columns = new List<ColumnData>();
		ColumnData data = new ColumnData();
		data.key = 'Name';
		data.value = 'Name';
		data.isSortable = true;
		data.isClickable = true;
		columns.add(data);
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			List<sObject> results = CustomLookupAuraService.fetchLookUpValues('Acc', 'Account', ' AND BillingCity != null ', ' BillingCity', jsonColumnData);
		Test.stopTest();

		Account acc1 = (Account)results[0];
		System.assertEquals(1,results.size(),'there should be an account returned');
		System.assertEquals('Akron',acc1.BillingCity, 'the email field should be returned');
	}

	@isTest
	public static void fetchLookupValuesWithWrapper_givenKeyword_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1');
		insert acc;
		List<ColumnData> columns = new List<ColumnData>();
		ColumnData data = new ColumnData();
		data.key = 'Name';
		data.value = 'Name';
		data.isSortable = true;
		data.isClickable = true;
		columns.add(data);
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			CustomLookupAuraService.CustomLookupTableResult results = CustomLookupAuraService.fetchLookupValuesWithWrapper('Account', jsonColumnData, 'Acc', '', true, 1, 'Id,Name', '');
		Test.stopTest();

		System.assertEquals(1,results.records.size(),'there should be an account returned');
	}

	@isTest
	public static void fetchLookupValuesWithWrapper_givenKeywordAndFilter_shouldReturnLookupValues(){
		Account acc = new Account(Name = 'Account1', BillingCity = 'Akron');
		insert acc;
		List<ColumnData> columns = new List<ColumnData>();
		ColumnData data = new ColumnData();
		data.key = 'Name';
		data.value = 'Name';
		data.isSortable = true;
		data.isClickable = true;
		columns.add(data);
		String jsonColumnData = JSON.serialize(columns);
		Test.startTest();
			CustomLookupAuraService.CustomLookupTableResult results = CustomLookupAuraService.fetchLookupValuesWithWrapper('Account', jsonColumnData, 'Acc', '', true, 1, 'Id,Name', ' And BillingCity != null ');
		Test.stopTest();

		System.assertEquals(1,results.records.size(),'there should be an account returned');
	}

	private class ColumnData{
		String key;
		String value;
		Boolean isClickable;
		Boolean isSortable;
	}
}