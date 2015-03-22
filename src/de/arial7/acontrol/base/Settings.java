package de.arial7.acontrol.base;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

import de.arial7.acontrol.gui.SettingsUI;

public class Settings {

	public static int BAUDRATE = 115200;
	public static boolean SHOW_CONSOLE = true;

	public static void loadAllSettings() {

		Properties prop = new Properties();
		InputStream input = null;
		;

		try {
			input = new FileInputStream(Reference.settingsFilePath);
			prop.load(input);

			BAUDRATE = Integer.valueOf(prop.getProperty("BAUDRATE"));
			SHOW_CONSOLE = Boolean.valueOf(prop.getProperty("SHOW_CONSOLE"));

			System.out.println("Finished loading settings");
			System.out.println("BAUDRATE: " + BAUDRATE);
			System.out.println("SHOW_CONSOLE: " + SHOW_CONSOLE);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public static void saveAllSettings() {
		Properties prop = new Properties();
		OutputStream output = null;
		try {
			output = new FileOutputStream(Reference.settingsFilePath);
			
			prop.setProperty("BAUDRATE", String.valueOf(BAUDRATE));
			prop.setProperty("SHOW_CONSOLE", String.valueOf(SHOW_CONSOLE));
			
			prop.store(output, null);
			
			Utils.output("Einstellungen gespeichert", Utils.LVL_INFO);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static void showSettingsPanel(){
		new SettingsUI();
	}
}
