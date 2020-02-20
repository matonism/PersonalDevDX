public with sharing class ProductController {
    
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(){
        return [SELECT Id, Name, Image_Height__c, Image_URL__c, Image_Width__c FROM Product2];
    }
}
