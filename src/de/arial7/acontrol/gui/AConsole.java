package de.arial7.acontrol.gui;

import java.awt.Dimension;
import java.awt.TextArea;

import de.arial7.acontrol.base.Main;

/**
 * @file AConsole.java
 * @author pascal
 */
@SuppressWarnings("serial")
public class AConsole extends TextArea {
	
	public AConsole(){
		setEditable(false);
		setMaximumSize(new Dimension(WIDTH, 100));
		setBounds(0, 350, Main.WIDTH, Main.HEIGHT - 360);
	}
	
	
}
