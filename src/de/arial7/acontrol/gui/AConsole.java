package de.arial7.acontrol.gui;

import java.awt.Color;

import javax.swing.JTextArea;

/**
 * @file AConsole.java
 * @author pascal
 */
@SuppressWarnings("serial")
public class AConsole extends JTextArea{

	public static String INFO = "[INFO] ";
	public static String WARN = "[WARNUNG] ";
	public static String FATAL = "[FATAL] ";


	
	public AConsole() {
		setEditable(false);
		setBackground(Color.WHITE);
		setColumns(40);
		setLineWrap(true);
		setWrapStyleWord(true);
		setAutoscrolls(true);
	 
	}

}
