package de.arial7.acontrol.base;

import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

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
	
	private static void saveAllSettings() {
		Properties prop = new Properties();
		OutputStream output = null;
		try {
			output = new FileOutputStream(Reference.settingsFilePath);
			
			prop.setProperty("BAUDRATE", String.valueOf(BAUDRATE));
			prop.setProperty("SHOW_CONSOLE", String.valueOf(SHOW_CONSOLE));
			
			prop.store(output, null);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static void showSettingsPanel(){
		final JFrame frame = new JFrame();
		frame.setSize(Reference.WIDTH >> 1, Reference.HEIGHT >> 1);
		frame.setResizable(false);
		frame.setLayout(new BoxLayout(frame.getContentPane(), BoxLayout.Y_AXIS));
		frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		
		final JCheckBox show_console_checkbox = new JCheckBox("Debuggingkonsole anzeigen (*)");
		show_console_checkbox.setAlignmentX(JCheckBox.CENTER_ALIGNMENT);
		frame.add(show_console_checkbox);
		
		///
		JLabel restartWarn = new JLabel("(*) Diese Option benötigt einen Neustart von AControl");
		//restartWarn.setHorizontalAlignment(JLabel.CENTER);
		restartWarn.setAlignmentX(JLabel.CENTER_ALIGNMENT);
		frame.add(restartWarn);
		///
		JPanel actionsPanel = new JPanel();
		actionsPanel.setLayout(new FlowLayout());
		/////
		JButton closeButton = new JButton("Abbrechen");
		closeButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				frame.setVisible(false);
				frame.dispose();
			}
		});
		actionsPanel.add(closeButton);
		JButton saveButton = new JButton("Speichern");
		saveButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				SHOW_CONSOLE = show_console_checkbox.isSelected();
				saveAllSettings();
				frame.setVisible(false);
				frame.dispose();
			}
		});
		actionsPanel.add(saveButton);
		frame.add(actionsPanel);
		frame.pack();
		frame.setVisible(true);
		}
}
