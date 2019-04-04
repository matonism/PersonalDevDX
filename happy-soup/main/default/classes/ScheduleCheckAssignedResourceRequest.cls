global class ScheduleCheckAssignedResourceRequest implements Schedulable {
	global void execute(SchedulableContext sc) {
		BatchCheckAssignedResourceRequest b = new BatchCheckAssignedResourceRequest();
		database.executebatch(b);
	}
}