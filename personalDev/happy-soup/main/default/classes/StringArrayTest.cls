public class StringArrayTest {

	public static List<String> generateStringArray(Integer n){
		String[] stringArray = new String[n];
		for (Integer i = 0; i<n; i++){
			stringArray[i] = 'Test ' + i;
		}
		return stringArray;
	}
}