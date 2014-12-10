package de.arial7.acontrol.gui;

import java.awt.image.BufferedImage;

import javax.swing.ImageIcon;
import javax.swing.JLabel;

import de.arial7.acontrol.base.Utils;

public class ACLabel extends JLabel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4026754317981041101L;
	
	
	public ACLabel(BufferedImage image, int x, int y) {
		this.setIcon(new ImageIcon(image));
		this.setSize(32,32);
		this.setLocation(Utils.getCoordinates(x, y));
	}
	
	
}
