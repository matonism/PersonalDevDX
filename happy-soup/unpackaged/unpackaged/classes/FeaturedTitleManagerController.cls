public class FeaturedTitleManagerController {
	private ApexPages.StandardSetController setController {get; set;}

	public FeaturedTitleManagerController(ApexPages.StandardSetController setController) {
		this.setController = setController;
		this.setController.addFields(new List<String>{
			'Is_Featured__c'
			});
	}

	public PageReference toggleFeaturedTitles(){
		List<Title__c> titles = (List<Title__c>) setController.getSelected();
		for(Title__c title : titles){
			title.Is_Featured__c = !title.Is_Featured__c;
		}

		return setController.save();
	}
}