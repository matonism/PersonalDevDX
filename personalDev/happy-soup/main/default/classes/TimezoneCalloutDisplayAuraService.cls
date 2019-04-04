public with sharing class TimezoneCalloutDisplayAuraService {
	
	@AuraEnabled
	public static DataEnvelope sendDataEnvelope(){
		DataEnvelope envelope = new DataEnvelope();
		envelope.locations = getLocationsToDisplay();
		return envelope;
	}


	@AuraEnabled
	public static String getTimeForCoordinates(String addr, Decimal lat, Decimal lng){
		String key = 'AIzaSyBPRZrHJkPazVSCzMCrShK5WpzatLklRzk';
		Long times_Stamp = System.currentTimeMillis()/1000;
		String body = '{"location":"'+ lat + ',' + lng + '","timestamp":' + times_Stamp + ',"key":"'+ key + '"}';

		HttpRequest req = new HttpRequest();
		req.setMethod('POST');
		req.setTimeout(10000); 
		req.setHeader('content-type', 'json');
		req.setHeader('Content-Length','1024');
		req.setHeader('cache','false');
		req.setHeader('async','false');

		req.setEndpoint('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&' + 'timestamp=' + times_Stamp + '&key=' + key);
		req.setBody(body); 

		Http http = new Http();
		try {
			HTTPResponse res = http.send(req);   
			System.debug(res.getBody());
			System.debug('STATUS:'+res.getStatus());
			System.debug('STATUS_CODE:'+res.getStatusCode());
			Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
			Object timeZoneId = results.get('timeZoneId');
			Object timeZoneName = results.get('timeZoneName');
			Integer rawOffset = (Integer) results.get('rawOffset');
			Integer dstOffset = (Integer) results.get('dstOffset');
			return rawOffset + ',' + dstOffset + ',' + timeZoneName + ',' + timeZoneId;
		} catch(System.CalloutException e) {
			throw new AuraHandledException('Could not retreive the time for the provided coordinates');
			System.debug('It didn\'t work');
			System.debug(e);
		} 
		return 'It didn\'t work';
	}

	@AuraEnabled
	public static String getCoordinatesForAddress(String address) {
		String key = 'AIzaSyBPRZrHJkPazVSCzMCrShK5WpzatLklRzk';

        double lat = null;
        double lng = null;

        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://maps.googleapis.com/maps/api/geocode/json?key=' + key + '&address=\"'+address+'\"&sensor=true');
        req.setMethod('GET');
            
        try {
            HttpResponse res = h.send(req);
            return res.getBody();

        }catch(Exception e){
        	throw new AuraHandledException('Could not retreive the coordinates for the address');
        }
        
	}
    
    private static List<String> getLocationsToDisplay(){
		return new List<String>{
			'Cleveland', 
			'Houston', 
			'Santa Fe, New Mexico', 
			//'El Paso, Texas', 
			//'Austin, Texas', 
			//'Dallas, Texas',
			//'India',
			//'Bangladesh',
			//'Tuscon',
			//'The Great Wall',
			//'Moscow',
			//'Monaco',
			'Sydney, Australia'
		};
	}

	private class DataEnvelope {
		@AuraEnabled
		List<String> locations {get; set;}

		public DataEnvelope(){}
	}

}