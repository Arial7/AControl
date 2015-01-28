package de.arial7.acontrol.base;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class Settings {
		
	public static int BAUDRATE = 115200;
	
	public static void loadAllSettings(){
		StringBuilder builder = new StringBuilder();
		try {
			BufferedReader reader = new BufferedReader(new FileReader(new File(Reference.settingsFilePath)));
			char read;
			while(!(( read = (char) reader.read()) == ';')){
				builder.append(read);
			}
			String setting = builder.toString();
			String key = setting.substring(0, setting.indexOf(':'));
			String value = setting.substring(setting.indexOf(':') + 1);
			reader.close();
			switch (key){
			case "BAUDRATE":
				BAUDRATE = Integer.valueOf(value);
				System.out.println(BAUDRATE);
				break;
			default:
				System.out.println("Error while loading settings: Unknown setting - Program might behave unexpected");
				break;			
			}
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}
