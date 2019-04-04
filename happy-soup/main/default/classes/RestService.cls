public with sharing class RestService {
	public static List<String> locations {get; set;}

	public RestService() {

	}

	public static void init(){
		locations = new List<String>();
		locations.add('Cleveland');
		locations.add('Houston');
		locations.add('Santa Fe, New Mexico');
		locations.add('El Paso, Texas');
		locations.add('Austin, Texas');
		locations.add('Dallas, Texas');
		locations.add('India');
		locations.add('Bangladesh');
		locations.add('Tuscon');
		locations.add('The Great Wall');
		locations.add('Moscow');
		locations.add('Monaco');
		locations.add('Sydney, Australia');
	}

	@RemoteAction
	public static String callLocation(String addr, Decimal lat, Decimal lng){
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
			System.debug('It didn\'t work');
			System.debug(e);
		} 
		return 'It didn\'t work';
	}

}