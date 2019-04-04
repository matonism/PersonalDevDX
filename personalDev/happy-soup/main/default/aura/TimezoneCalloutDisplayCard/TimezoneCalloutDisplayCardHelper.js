({

	getCoordinatesForLocation : function(component){
		this.showSpinner(component);
		var action = component.get("c.getCoordinatesForAddress");

		var address = component.get("v.location");
		var address = address.replace(/ /g, "%20");

		action.setParams({
			address: address
		});

		action.setCallback(this, function(response){
			var state = response.getState();
			if(state === "SUCCESS"){
				var locationDataPayload = JSON.parse(response.getReturnValue());
				var coordinates = {};
				coordinates.latitude = locationDataPayload.results[0].geometry.location.lat;
				coordinates.longitude = locationDataPayload.results[0].geometry.location.lng;
				coordinates.address = address;
				this.displayCurrentTime(component, coordinates);
			}else{
				console.log("Error retrieving time");
				this.hideSpinner(component);
			}

		});

		$A.enqueueAction(action);
	},



	displayCurrentTime : function(component, coordinates) {
		var action = component.get("c.getTimeForCoordinates");

		var address = coordinates.address.replace(" ", "%20");
		var latitude = coordinates.latitude;
		var longitude = coordinates.longitude;

		action.setParams({
			addr: address,
			lat: latitude,
			lng: longitude
		});

		action.setCallback(this, function(response){
			var state = response.getState();
			if(state === "SUCCESS"){
				var timeInformation = response.getReturnValue();
				var currentTime = this.formatCurrentTime(timeInformation);
				component.set("v.currentTime", currentTime);
			}else{
				console.log("Error retrieving time");
			}
			this.hideSpinner(component);

		});

		$A.enqueueAction(action);

	},

	formatCurrentTime : function(rawTime){
		var resArray = rawTime.split(",");
		var rawOffset = resArray[0];
		var dstOffset = resArray[1];
		var timeZoneName = resArray[2];
		var timeZoneId = resArray[3]

		var hourOffset = rawOffset/3600;
		var Cur_Date = new Date();
		var UTC = Cur_Date.getTime() + (Cur_Date.getTimezoneOffset() * 60000);
		var Loc_Date = new Date(UTC + (1000*rawOffset) + (1000*dstOffset));
		
		return Loc_Date.toLocaleString() + " : UTC " + hourOffset;
	},

	showSpinner : function(component){
		this.showElement(component, "loading-icon");
	},

	hideSpinner : function(component){
		this.hideElement(component, "loading-icon");
	},

	showElement : function(component, elementId){
		var domElement = component.find(elementId);
		if(domElement){
			$A.util.removeClass(domElement, "slds-hide");
			$A.util.addClass(domElement, "slds-show");
		}
	},

	hideElement : function(component, elementId){
		var domElement = component.find(elementId);
		if(domElement){
			$A.util.removeClass(domElement, "slds-show");
			$A.util.addClass(domElement, "slds-hide");
		}
	},
})