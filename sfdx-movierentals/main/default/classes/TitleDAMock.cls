public class TitleDAMock implements TitleDAI {
    public List<Title__c> queryLimitedTitles(Integer limitter) {
        List<Title__c> titles = new List<Title__c>();
        titles.add(new Title__c(Name='TestTitle1', Genre__c='Documentary;Western', Is_Featured__c=true));
        titles.add(new Title__c(Name='TestTitle2', Genre__c='Action;Adventure', Is_Featured__c=false));
        return titles;
    }
}