public with sharing class AttachmentToBlobController {
	
	public AttachmentsObject__c obj {get; set;}
	public String objString {get; set;}
	public Blob bodyBlob {get; set;}

	public AttachmentToBlobController(ApexPages.StandardController stdController) {
        obj = (AttachmentsObject__c)stdController.getRecord();
        Attachment attachment = [SELECT Id, ParentId, Name, Body, ContentType FROM Attachment WHERE Parentid = :obj.Id];
        bodyBlob = attachment.Body;
        objString = EncodingUtil.base64Encode(bodyBlob);
        bodyBlob = EncodingUtil.base64Decode(objString);
        System.debug(attachment.Name);
        System.debug(attachment.ContentType);
        System.debug(attachment.Body);

        //objString = bodyBlob.toString();
    }

}