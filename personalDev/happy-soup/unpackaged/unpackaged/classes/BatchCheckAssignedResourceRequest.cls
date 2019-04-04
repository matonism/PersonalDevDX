global class BatchCheckAssignedResourceRequest implements Database.Batchable<sObject> {
	
	String query;
	
	global BatchCheckAssignedResourceRequest() {
		query = 'SELECT Name, Id, Project__c, Status__c, StartDate__c, EndDate__c, Project__r.ResourceRequestAssigned__c FROM ResourceRequest__c';
	}
	
	global Database.QueryLocator start(Database.BatchableContext BC) {
		return Database.getQueryLocator(query);
	}

   	global void execute(Database.BatchableContext BC, List<ResourceRequest__c> scope) {
		
   		Map<Id, List<ResourceRequest__c>> projectIdToResourceRequest = ResourceRequestTriggerHelper.createProjectIdToResourceRequestMap(scope);
		ResourceRequestTriggerHelper.updateProjectForResourceRequests(projectIdToResourceRequest);



  // 		Map<Id, List<ResourceRequest__c>> projectIdToResourceRequest = new Map<Id, List<ResourceRequest__c>>();
		//for(ResourceRequest__c request : scope){
		//	if(projectIdToResourceRequest.keySet().contains(request.Project__c)){
		//		projectIdToResourceRequest.get(request.Project__c).add(request);
		//	}else{
		//		List<ResourceRequest__c> newList = new List<ResourceRequest__c>();
		//		newList.add(request);
		//		projectIdToResourceRequest.put(request.Project__c, newList);
		//	}
		//}



		//Map<Id, Project__c> allProjectsWithResourceRequests = new Map<Id, Project__c>([SELECT Name, Id, ResourceRequestAssigned__c FROM Project__c WHERE Id IN :projectIdToResourceRequest.keySet()]);
		//Map<Id, Project__c> projectsToUpdate = new Map<Id, Project__c>();

		//for(Id projectId : projectIdToResourceRequest.keySet()){
		//	Boolean hasAssignedResourceRequest = false;
		//	List<ResourceRequest__c> requestsForProject = projectIdToResourceRequest.get(projectId);
		//	for(Integer i = 0; i < requestsForProject.size(); i++){		
		//		ResourceRequest__c requestForProject = requestsForProject.get(i);				
		//		if(requestForProject.Status__c == 'Assigned' && requestForProject.StartDate__c <= Date.today() && requestForProject.EndDate__c > Date.today()){
		//			hasAssignedResourceRequest = true;
		//			if(allProjectsWithResourceRequests.get(projectId).ResourceRequestAssigned__c == false){

		//				projectsToUpdate.put(projectId, allProjectsWithResourceRequests.get(projectId));
		//				projectsToUpdate.get(projectId).ResourceRequestAssigned__c = true;
		//				break;
		//			}
		//		}else if(allProjectsWithResourceRequests.get(projectId).ResourceRequestAssigned__c == true && hasAssignedResourceRequest == false && i == requestsForProject.size()-1){
		//			projectsToUpdate.put(projectId, allProjectsWithResourceRequests.get(projectId));
		//			projectsToUpdate.get(projectId).ResourceRequestAssigned__c = false;
		//		}
		//	}

		//}

		//update projectsToUpdate.values();
	}
	
	global void finish(Database.BatchableContext BC) {
		
	}
	
}