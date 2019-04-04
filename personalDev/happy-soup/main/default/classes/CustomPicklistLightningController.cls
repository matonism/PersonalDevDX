public with sharing class CustomPicklistLightningController {


	public DateTime endDateTime{get;private set;}

	public String durationSelection{get;set{
			System.debug(durationSelection);
			System.debug(value);
			durationSelection = value;
		}
	}

	public List<SelectOption> durationOptions{get;private set;}

	public Event evnt { get; 
		set {
			if (value != null) {
				evnt = value;
				durationSelection = String.valueOf(evnt.DurationInMinutes);
				setStartEndDateTime();
			}
		}
	}

	public CustomPicklistLightningController() {
		setOptions();
		evnt = new Event();
	} 

	
	public String getFormattedEndDateTime() {
		return (endDateTime != null ? endDateTime.format() : null);
	}


	private void setStartEndDateTime() {
		System.debug('in setStartEndDateTime');
		if (durationSelection != null && evnt.ActivityDate != null) {
			System.debug(durationSelection);
			System.debug(evnt.ActivityDate);
			evnt.DurationInMinutes = Integer.valueOf(durationSelection);
			evnt.ActivityDateTime = DateTime.valueOf(evnt.ActivityDate.year()+'-'+
				evnt.ActivityDate.month()+'-'+
				evnt.ActivityDate.day());
			endDateTime = evnt.ActivityDateTime.addMinutes(evnt.DurationInMinutes);
		}
	}

	private void setOptions() {
		if (durationOptions == null) {
			durationOptions = new List<SelectOption>();
			durationOptions.add(new SelectOption('30','30 Minutes'));
			durationOptions.add(new SelectOption('60','1 Hour'));
			durationOptions.add(new SelectOption('90','1 1/2 Hours'));
			durationOptions.add(new SelectOption('120','2 Hours'));
			durationOptions.add(new SelectOption('150','2 1/2 Hours'));
			durationOptions.add(new SelectOption('180','3 Hours'));
			durationOptions.add(new SelectOption('210','3 1/2 Hours'));
			durationOptions.add(new SelectOption('240','4 Hours'));
		}
	} // setOptions

	public PageReference changeDateTime() {
		setStartEndDateTime();
		return null;
	} //

}