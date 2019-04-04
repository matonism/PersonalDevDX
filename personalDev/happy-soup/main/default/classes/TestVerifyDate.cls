@isTest
public class TestVerifyDate {
	@isTest static void test2MonthsApart(){
		Date today = Date.today();
		Test.startTest();
		Date resultDate = VerifyDate.CheckDates(today, today.addMonths(2));
		Test.stopTest();

		Integer totalDays = Date.daysInMonth(today.year(), today.month());
		Date lastDay = Date.newInstance(today.year(), today.month(), totalDays);

		System.assertEquals(resultDate, lastDay);
	}

	@isTest static void test2DaysApart(){
		Date today = Date.today();
		Test.startTest();
		Date resultDate = VerifyDate.CheckDates(today, today.addDays(2));
		Test.stopTest();

		Integer totalDays = Date.daysInMonth(today.year(), today.month());
		Date lastDay = Date.newInstance(today.year(), today.month(), totalDays);

		System.assertEquals(resultDate, today.addDays(2));
	}


}