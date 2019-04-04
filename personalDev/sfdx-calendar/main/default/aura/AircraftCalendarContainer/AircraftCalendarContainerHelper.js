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
			displayEventTime: false,
			eventConstraint: {
				start: moment().format('YYYY-MM-DD'),
				end: '2100-01-01'
			},
			eventColor: 'blue',
			views: {
				basic: {eventLimit: 3},
				agenda: {eventLimit: 3},
				week: {eventLimit: 3},
				month: {eventLimit: 3},
			}
		})
	},

	getCurrentDateFormattedForFullCalendar : function(component, event, helper){
		return moment().format('YYYY-MM-DD');
	},

	getFormattingBookings : function(component, event, helper){
		var formattedBookings = [{
			id: 'ABCD',
			start: moment().format('YYYY-MM-DD'),
			end: moment().add(4,'days').add(1, 'hours').format(),
			title: 'Owner Use',
			allDay: false,
			color: 'rgba(25,150,200,1)'
		},
		{
			id: 'ABCD2',
			start: '2019-02-18',
			end: '2019-02-19',
			title: 'Charter',
			allDay: false,
			color: 'rgba(250,10,100,1)'
		},
		{
			id: 'ABCD3',
			start: '2019-02-19',
			end: '2019-02-19',
			title: 'Charter',
			allDay: false,
			color: 'rgba(250,10,100,1)'
		}];
		return formattedBookings;

	}
})