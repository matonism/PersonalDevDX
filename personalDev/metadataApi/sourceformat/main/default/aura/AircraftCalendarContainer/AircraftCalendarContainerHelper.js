({
	loadCalendarData : function(component, event, helper) {
		helper.initializeCalendar(component, event, helper, helper.getFormattingBookings(component, event, helper));
	},
	
	initializeCalendar : function(component, event, helper, bookings){
		var calendarElement = component.find("calendar").getElement();
		$(calendarElement).fullCalendar({
			header: {
				left: "month,basicWeek,basicDay",
				center: "title",
				right: "today, prev,next"
			},
			defaultDate: helper.getCurrentDateFormattedForFullCalendar(),
			editable: true,
			events: bookings,
			droppable: true,
			displayEventTime: true,
			eventConstraint: {
				start: moment().format('YYYY-MM-DD'),
				end: '2100-01-01'
			},
			views: {
				basic: {eventLimit: 3},
				agenda: {eventLimit: 3},
				week: {eventLimit: 3},
				month: {eventLimit: 3},
			}
		})
	},

	getCurrentDateFormattedForFullCalendar : function(component, event, helper){
		var today = new Date();
		var year = today.getFullYear();
		var date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
		var month = today.getMonth() + 1 < 10 ? '0' + today.getMonth() + 1 : today.getMonth() + 1;

		return moment().format('YYYY-MM-DD');
	},

	getFormattingBookings : function(component, event, helper){
		var formattedBookings = [{
			id: 'ABCD',
			start: '2019-02-11',
			end: '2019-02-14',
			title: 'Test Event',
			allDay: false
		},
		{
			id: 'ABCD2',
			start: '2019-02-18',
			end: '2019-02-18',
			title: 'Test Event All Day',
			allDay: true
		}];
		return formattedBookings;

	}
})