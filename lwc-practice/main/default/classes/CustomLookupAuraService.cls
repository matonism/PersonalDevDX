public with sharing class CustomLookupAuraService {
	public static final Integer PAGE_SIZE = 10;

	@AuraEnabled(cacheable=true)
	public static List<SObject> fetchLookUpValues (String searchKeyWord, String objectName, String filter, String fields, String jsonColumnData){
		// String searchKey = '%' + searchKeyWord + '%';
		return fetchLookUpValues(searchKeyWord, objectName, filter, fields, jsonColumnData, null, null);
	}

	@AuraEnabled(cacheable=true)
	public static List<SObject> fetchLookUpValues (String searchKeyWord, String objectName, String filter, String fields, String jsonColumnData, String orderBy, String limitString){
		// String searchKey = '%' + searchKeyWord + '%';
		String searchKey = searchKeyWord;

		List<sObject> returnList = new List<sObject> ();

		String selectStatement = '';
		if(!String.isEmpty(fields)) {
			selectStatement = 'SELECT Id, Name, ' + fields + ' FROM ';
		} else {
			selectStatement = 'SELECT Id, Name FROM ';
		}

		List<ColumnData> columnData;
		try{
			columnData = (List<ColumnData>)JSON.deserialize(jsonColumnData, List<ColumnData>.class);
		}catch(JSONException e){
			System.debug(e);
			columnData = new List<ColumnData>{
				new ColumnData('Id', 'Id', true, true),
				new ColumnData('Name', 'Name', true, true)
			};
		}
		List<String> fieldsToQuery = new List<String>();
		SObjectType r = ((SObject)(Type.forName('Schema.'+objectName).newInstance())).getSObjectType();
		DescribeSObjectResult d = r.getDescribe();
		for(ColumnData data : columnData){

			if(d.fields.getMap().get(data.key) != null){
				if(d.fields.getMap().get(data.key).getDescribe().getType() == Schema.DisplayType.STRING){
					fieldsToQuery.add(data.key);
				}
			}
		}

		String whereStatement = '';
		if(objectName == 'Contact') {
			whereStatement = buildNameWhereClause(fieldsToQuery, searchKey);
		} else {
			whereStatement = buildWhereClause(fieldsToQuery, searchKey);
		}

		String orderStatement;

		if (String.isNotBlank(orderBy)) {
			orderStatement = orderBy;
		} else {
			orderStatement = 'ORDER BY CreatedDate DESC';
		}

		if (String.isNotBlank(limitString)) {
			orderStatement += ' ' + limitString;
		} else {
			orderStatement += ' LIMIT 5';
		}

		String sQuery = selectStatement + objectName + ' ' + whereStatement;
		if(!String.isEmpty(filter)) {
			sQuery += filter;
		}

		sQuery += orderStatement;


		List<sObject> lstOfRecords = Database.query(sQuery);

		for (SObject obj: lstOfRecords){
			returnList.add(obj);
		}

		return returnList;
	}

	@AuraEnabled(cacheable=true)
	public static CustomLookupTableResult fetchLookupValuesWithWrapper(String objectName, String columnString, String searchKey,
								String fieldToSort, Boolean isAscending, Integer pageNumber, String fields, String filter) {

		CustomLookupTableResult result = new CustomLookupTableResult();
		List<String> fieldList = fields.split(',');
		List<ColumnData> columnData;
		try{
			columnData = (List<ColumnData>)JSON.deserialize(columnString, List<ColumnData>.class);
		}catch(JSONException e){
			System.debug(e);
			columnData = new List<ColumnData>{
				new ColumnData('Id', 'Id', true, true),
				new ColumnData('Name', 'Name', true, true)
			};
		}
		// List<ColumnData> columnData = (List<ColumnData>)JSON.deserialize(columnString, List<ColumnData>.class);
		searchKey = searchKey + '%';
		Set<String> splitFields = new Set<String>(fieldList);
		List<String> fieldsToQuery = new List<String>();
		List<String> fieldsToQueryForWhere = new List<String>();
		SObjectType r = ((SObject)(Type.forName('Schema.'+objectName).newInstance())).getSObjectType();
		DescribeSObjectResult d = r.getDescribe();
		for(ColumnData data : columnData){
			if(data.key != 'Id' && data.key != 'Name' && !splitFields.contains(data.key)){
				fieldsToQuery.add(data.key);
			}
			if(d.fields.getMap().get(data.key) != null){
				if(d.fields.getMap().get(data.key).getDescribe().getType() == Schema.DisplayType.STRING){
					fieldsToQueryForWhere.add(data.key);
				}
			}
		}
		String selectStatement = '';
		if(!fieldsToQuery.isEmpty()) {
			selectStatement = 'SELECT Id, Name ';
			for(String field : fieldsToQuery){
				if(!String.isBlank(field)){
					selectStatement = selectStatement + ', ' + field;
				}
			}
			selectStatement = selectStatement + ' FROM ';
		} else {
			selectStatement = 'SELECT Id, Name FROM ';
		}

		String whereStatement = '';
		if(objectName == 'Contact') {
			whereStatement = buildNameWhereClause(fieldsToQueryForWhere, searchKey);
		} else {
			whereStatement = buildWhereClause(fieldsToQueryForWhere, searchKey);
		}

		String sQuery = selectStatement + objectName + ' ' + whereStatement;
		if(!String.isEmpty(filter)) {
			sQuery += filter;
		}

		List<sObject> lstOfRecords = Database.query(sQuery);

		result.totalItemCount = lstOfRecords.size();

		sQuery = sQuery.removeEnd(')');
		if(String.isNotEmpty(fieldToSort)){
			sQuery = sQuery + ' ORDER BY ' + fieldToSort;
			if(!isAscending){
				sQuery += ' DESC';
			}
			sQuery += ' NULLS LAST';
		}

		sQuery = sQuery + ' LIMIT ' + PAGE_SIZE;
		Integer offsetNumber = (pageNumber-1) * PAGE_SIZE;
		sQuery = sQuery + ' OFFSET ' + offsetNumber;

		List<Object> searchList = Database.query(sQuery);
		result.records = searchList;

		return result;
	}

	private static String buildWhereClause(List<String> fieldsToQueryForWhere, String searchKey){
		String whereStatement = '';
		for(Integer i = 0; i<fieldsToQueryForWhere.size(); i++){
			if(i == 0){
				whereStatement = 'WHERE (Name LIKE \'%' + searchKey + '%\' OR ';
			}
			whereStatement = whereStatement + fieldsToQueryForWhere[i] + ' LIKE \'%' + searchKey + '%\' ';
			if(i < fieldsToQueryForWhere.size()-1){
				whereStatement = whereStatement + 'OR ';
			}
			if(i == fieldsToQueryForWhere.size()-1){
				whereStatement = whereStatement + ') ';
			}
		}
		return whereStatement;
	}

	public static String buildNameWhereClause(List<String> fieldsToQueryForWhere, String searchKey) {
		String whereStatement = '';

		for(Integer i = 0; i < fieldsToQueryForWhere.size(); i++) {
			if(i == 0) {
				whereStatement = 'WHERE (' + buildNameQuery(searchKey);
			} else {
				whereStatement = whereStatement + fieldsToQueryForWhere[i] + ' LIKE \'%' + searchKey + '%\' ';
			}

			if(i < fieldsToQueryForWhere.size() - 1) {
				whereStatement = whereStatement + 'OR ';
			}
		}

		whereStatement = whereStatement + ') ';

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
		
		public ColumnData(String key, String value, Boolean isClickable, Boolean isSortable){
			this.key = key;
			this.value = value;
			this.isClickable = isClickable;
			this.isSortable = isSortable;
		}
	}
}