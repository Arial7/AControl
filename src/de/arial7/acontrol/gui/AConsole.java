package de.arial7.acontrol.gui;

import java.awt.Color;
import java.awt.TextArea;

/**
 * @file AConsole.java
 * @author pascal
 */
@SuppressWarnings("serial")
public class AConsole extends TextArea {
	
	public static String INFO  = "[INFO] ";
	public static String WARN  = "[WARNUNG] ";
	public static String FATAL = "[FATAL] ";
	
	public AConsole(){
		setEditable(false);
		setBackground(Color.WHITE);
		
	}
	
}
