public with sharing class ResourceRequestTriggerHelper {
	public ResourceRequestTriggerHelper() {
		
	}

	public static void updateProjectResourceRequestCheckbox(List<ResourceRequest__c> scope){
   		Map<Id, List<ResourceRequest__c>> projectIdToResourceRequest = createProjectIdToResourceRequestMap(scope);

		List<ResourceRequest__c> allSiblingResourceRequests = [SELECT Name, Id, StartDate__c, EndDate__c, Status__c, Project__c FROM ResourceRequest__c WHERE Project__c IN :projectIdToResourceRequest.keySet()];
		
		if(allSiblingResourceRequests != null){
			projectIdToResourceRequest = addResourceRequestSiblingsToMap(projectIdToResourceRequest, allSiblingResourceRequests);
		}

		updateProjectForResourceRequests(projectIdToResourceRequest);

	}

	public static Map<Id, List<ResourceRequest__c>> createProjectIdToResourceRequestMap(List<ResourceRequest__c> scope){
   		Map<Id, List<ResourceRequest__c>> projectIdToResourceRequest = new Map<Id, List<ResourceRequest__c>>();
		for(ResourceRequest__c request : scope){
			if(projectIdToResourceRequest.keySet().contains(request.Project__c)){
				projectIdToResourceRequest.get(request.Project__c).add(request);
			}else{
				List<ResourceRequest__c> newList = new List<ResourceRequest__c>();
				newList.add(request);
				projectIdToResourceRequest.put(request.Project__c, newList);
			}
		}
		return projectIdToResourceRequest;
	}




	public static void updateProjectForResourceRequests(Map<Id, List<ResourceRequest__c>> projectIdToResourceRequest){
		Map<Id, Project__c> allProjectsWithResourceRequests = new Map<Id, Project__c>([SELECT Name, Id, ResourceRequestAssigned__c FROM Project__c WHERE Id IN :projectIdToResourceRequest.keySet()]);
		Map<Id, Project__c> projectsToUpdate = new Map<Id, Project__c>();


		for(Id projectId : projectIdToResourceRequest.keySet()){
			Boolean hasAssignedResourceRequest = false;
			List<ResourceRequest__c> requestsForProject = projectIdToResourceRequest.get(projectId);
			
			for(Integer i = 0; i < requestsForProject.size(); i++){		
				ResourceRequest__c requestForProject = requestsForProject.get(i);				
				
				if(requestForProject.Status__c == 'Assigned' && requestForProject.StartDate__c <= Date.today() && requestForProject.EndDate__c > Date.today()){
					hasAssignedResourceRequest = true;
					
					if(allProjectsWithResourceRequests.get(projectId).ResourceRequestAssigned__c == false){
						projectsToUpdate.put(projectId, allProjectsWithResourceRequests.get(projectId));
						projectsToUpdate.get(projectId).ResourceRequestAssigned__c = true;
						break;
					}

				}else if(allProjectsWithResourceRequests.get(projectId).ResourceRequestAssigned__c == true && hasAssignedResourceRequest == false && i == requestsForProject.size()-1){
					projectsToUpdate.put(projectId, allProjectsWithResourceRequests.get(projectId));
					projectsToUpdate.get(projectId).ResourceRequestAssigned__c = false;
				}

			}

		}

		update projectsToUpdate.values();
	}


	private static Map<Id, List<ResourceRequest__c>> addResourceRequestSiblingsToMap(Map<Id, List<ResourceRequest__c>> projectIdToResourceRequest,  List<ResourceRequest__c> allSiblingResourceRequests){
		
		for(ResourceRequest__c siblingResource : allSiblingResourceRequests){
			projectIdToResourceRequest.get(siblingResource.Project__c).add(siblingResource);
		}
		return projectIdToResourceRequest;

	}

}