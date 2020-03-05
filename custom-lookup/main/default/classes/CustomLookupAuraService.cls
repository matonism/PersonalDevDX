public with sharing class CustomLookupAuraService {

	public static final Integer PAGE_SIZE = 2;

	@AuraEnabled(cacheable=true)
	public static List<SObject> fetchLookUpValues (String searchKeyword, String objectName, String jsonColumnData){
		return fetchLookUpValues(searchKeyword, objectName, jsonColumnData, null, null);
	}

	//fetch records for lookup drop down quick results
	@AuraEnabled(cacheable=true)
	public static List<SObject> fetchLookUpValues (String searchKeyword, String objectName, String jsonColumnData, String orderBy, Integer limiter){

		List<sObject> searchResults = new List<sObject> ();

		List<ColumnData> columnData = (List<ColumnData>)JSON.deserialize(jsonColumnData, List<ColumnData>.class);

		List<String> fieldsToCheckAgainstKeyword = getFieldsToCheckAgainstKeyword(objectName, columnData);
		List<String> fieldsToDisplayInColumns = getFieldsToDisplayInColumns(objectName, columnData);

		String selectStatement = buildSelectStatement(fieldsToDisplayInColumns);
		String whereStatement = buildWhereClause(objectName, fieldsToCheckAgainstKeyword, searchKeyword);
		String orderStatement = buildOrderStatement('CreatedDate', false);
		String limitStatement = buildLimitStatement(limiter);
		
		String sQuery = selectStatement + objectName + ' ' + whereStatement + orderStatement + limitStatement;
		System.debug(sQuery);
		List<sObject> lstOfRecords = Database.query(sQuery);

		for (SObject obj: lstOfRecords){
			searchResults.add(obj);
		}

		return searchResults;
	}

	//Fetch records for the table of displayed records in the popup modal
	@AuraEnabled(cacheable=true)
	public static CustomLookupTableResult fetchLookupValuesWithWrapper(String objectName, String columnString, String searchKey, String fieldToSort, Boolean isAscending, Integer pageNumber) {

		CustomLookupTableResult result = new CustomLookupTableResult();

		List<ColumnData> columnData = (List<ColumnData>)JSON.deserialize(columnString, List<ColumnData>.class);
		
		List<String> fieldsToCheckForKeyword = getFieldsToCheckAgainstKeyword(objectName, columnData);
		List<String> fieldsToDisplayInColumns = getFieldsToDisplayInColumns(objectName, columnData);

		String selectStatement = buildSelectStatement(fieldsToCheckForKeyword);
		String whereStatement = buildWhereClause(objectName, fieldsToCheckForKeyword, searchKey);

		String fullQuery = selectStatement + objectName + ' ' + whereStatement;

		List<sObject> allPossibleLookupRecords = Database.query(fullQuery);

		result.totalItemCount = allPossibleLookupRecords.size();

		String orderStatement = buildOrderStatement(fieldToSort, isAscending);
		String limitStatement = buildLimitStatement(PAGE_SIZE);
		String offsetStatement = ' OFFSET ' + (pageNumber-1) * PAGE_SIZE;
		
		String paginationQuery = fullQuery + orderStatement + limitStatement + offsetStatement;

		List<Object> searchList = Database.query(paginationQuery);
		result.records = searchList;
		System.debug(result);
		return result;
	}


	private static List<String> getFieldsToCheckAgainstKeyword(String objectName, List<ColumnData> columnData){
		
		List<String> fieldsToCheckAgainstKeyword = new List<String>();
		SObjectType r = ((SObject)(Type.forName('Schema.'+objectName).newInstance())).getSObjectType();
		DescribeSObjectResult d = r.getDescribe();
		for(ColumnData data : columnData){


			if(d.fields.getMap().get(data.key) != null && data.isSortable){
				if(d.fields.getMap().get(data.key).getDescribe().getType() == Schema.DisplayType.STRING){
					fieldsToCheckAgainstKeyword.add(data.key);
				}
			}
		}

		return fieldsToCheckAgainstKeyword;
	}

	private static List<String> getFieldsToDisplayInColumns(String objectName, List<ColumnData> columnData){
		
		List<String> fieldsToDisplayInColumns = new List<String>();
		SObjectType r = ((SObject)(Type.forName('Schema.'+objectName).newInstance())).getSObjectType();
		DescribeSObjectResult d = r.getDescribe();
		for(ColumnData data : columnData){

			if(d.fields.getMap().get(data.key) != null){
				fieldsToDisplayInColumns.add(data.key);
			}
		}

		return fieldsToDisplayInColumns;
	}

	private static String buildSelectStatement(List<String> fields){

		String selectStatement = 'SELECT Id, Name';
		for(Integer i = 0; i < fields.size(); i++){
			if(fields.get(i) != 'Id' && fields.get(i) != 'Name'){
				selectStatement += ', ' + fields.get(i);
			}
		}

		selectStatement += ' FROM ';

		return selectStatement;
	}

	private static String buildWhereClause(String objectName, List<String> fieldsToCheckAgainstKeyword, String searchKey){
		String whereStatement = '';
		for(Integer i = 0; i<fieldsToCheckAgainstKeyword.size(); i++){
			if(i == 0){
				whereStatement += 'WHERE ( ';
			}

			if(fieldsToCheckAgainstKeyword.get(i) == 'Name') {
				whereStatement += buildNameQuery(searchKey);
			} else {
				whereStatement += fieldsToCheckAgainstKeyword[i] + ' LIKE \'%' + searchKey + '%\' ';
			}

			if(i < fieldsToCheckAgainstKeyword.size() - 1) {
				whereStatement = whereStatement + 'OR ';
			}

			if(i == fieldsToCheckAgainstKeyword.size()-1){
				whereStatement = whereStatement + ') ';
			}

		}

		return whereStatement;
	}

	private static String buildNameQuery(String searchKey) {
		String whereStatement = '';
		
		List<String> searchTokens = searchKey.split(' ');
		if(searchTokens.size() > 1) {
			whereStatement = '(';
			for(Integer j = 0; j < searchTokens.size(); j++) {
				whereStatement = whereStatement + 'Name LIKE \'%' + String.escapeSingleQuotes(searchTokens[j]) + '%\'';
				if(j != searchTokens.size() - 1) {
					whereStatement = whereStatement + ' AND ';
				}
			}

			whereStatement = whereStatement + ') ';
		} else {
			whereStatement = 'Name LIKE \'%' + String.escapeSingleQuotes(searchKey) + '%\' ';
		}
		return whereStatement;
	}


	public static String buildOrderStatement(String fieldToSort, Boolean isAscending){

		String orderStatement = '';
		if(String.isNotEmpty(fieldToSort)){
			orderStatement += ' ORDER BY ' + fieldToSort;
			if(!isAscending){
				orderStatement += ' DESC';
			}
			orderStatement += ' NULLS LAST';
		}else{
			orderStatement += ' ORDER BY CreatedDate DESC ';
		}
		return orderStatement;
	}

	public static String buildLimitStatement(Integer limiter){
		
		String limitStatement = '';
		if (limiter != null) {
			limitStatement = ' LIMIT ' + limiter + ' ';
		} else {
			limitStatement = ' LIMIT 5 ';
		}
		return limitStatement;
	}

	public with sharing class CustomLookupTableResult{
		@AuraEnabled
		public Integer totalItemCount { get; set; }

		@AuraEnabled
		public Object[] records { get; set; }
	}

	private class ColumnData{

		String key;
		String value;
		Boolean isClickable;
		Boolean isSortable;
		Boolean isSearchable;
		
		public ColumnData(String key, String value, Boolean isClickable, Boolean isSortable, Boolean isSearchable){
			this.key = key;
			this.value = value;
			this.isClickable = isClickable;
			this.isSortable = isSortable;
			this.isSearchable = isSearchable;
		}
	}
}