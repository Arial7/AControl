package de.arial7.acontrol.gui;

import java.awt.Color;
import java.awt.Dimension;

import javax.swing.JPanel;

import de.arial7.acontrol.base.Reference;
import de.arial7.acontrol.base.States;
import de.arial7.acontrol.plan.PlanParser;

public class MainPane extends JPanel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -445140737437480983L;

	/**
	 * Create the panel.
	 */
	public MainPane() {
		setBackground(Color.LIGHT_GRAY);
		setForeground(Color.DARK_GRAY);
		setLayout(null);
		
	}

	public void init() {
		setMinimumSize(new Dimension(((PlanParser.loadedX + 1) * Reference.TILE_SIZE ), ((PlanParser.loadedY +1) * Reference.TILE_SIZE)));
		setSize(new Dimension(((PlanParser.loadedX +1) * Reference.TILE_SIZE ), ((PlanParser.loadedY +1) * Reference.TILE_SIZE)));
	}
	

	public void saveStates() {

		States.saveStates();

	}

	
}
