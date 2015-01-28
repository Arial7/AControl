package de.arial7.acontrol.ardulinkredone;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import org.zu.ardulink.Link;

/**
 * @file ConnectButton.java
 * @author pascal
 */
@SuppressWarnings("serial")
public class ConnectButton extends JButton {

		public ConnectButton(final String port, final String baudRate) {
			this.setText("Verbinden");
			this.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {

					String comPort = port;
					String baudRateS = baudRate;

					try {
						int baudRate = Integer.parseInt(baudRateS);
						Link.getDefaultInstance().connect(comPort, baudRate);
						Thread.sleep(2000);
						Link.getDefaultInstance().sendCustomMessage("connect");
					} catch (Exception ex) {
						ex.printStackTrace();
						String message = ex.getMessage();
						if (message == null || message.trim().equals("")) {
							message = "Generic Error on connection";
						}
						
					}
				}
			});
	}
}
