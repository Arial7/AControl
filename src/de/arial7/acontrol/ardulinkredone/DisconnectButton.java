package de.arial7.acontrol.ardulinkredone;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import org.zu.ardulink.Link;

/**
 * @file DisconnectButton.java
 * @author pascal
 */
@SuppressWarnings("serial")
public class DisconnectButton extends JButton{
	
	public DisconnectButton(){
		this.setText("Trennen");
		this.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Link.getDefaultInstance().sendCustomMessage("disconnect");
				Link.getDefaultInstance().disconnect();
			}
		});
	}
}
