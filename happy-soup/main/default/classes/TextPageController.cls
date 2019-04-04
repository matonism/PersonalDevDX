public class TextPageController {
	
	public List<PageText__c> textBlurbs {get; private set;}
	public Map<String, String> boxText {get; private set;}

	public TextPageController() {
		textBlurbs = queryPageTextsForTextPage();
		boxText = initializeBoxTexts();
	}

	public List<PageText__c> queryPageTextsForTextPage(){
		return [
			SELECT Id, Name, PageSection__c, Text__c
			FROM PageText__c
			WHERE PageName__c = 'TextPage'
		];
	}

	public Map<String, String> initializeBoxTexts(){
		Map<String, String> tempBoxText = new Map<String, String>();
		for(PageText__c pt : textBlurbs){
			if((pt.PageSection__c).contains('Box')){
				tempBoxText.put(pt.PageSection__c, pt.Text__c);
			}
		}
		return tempBoxText;
	}
}