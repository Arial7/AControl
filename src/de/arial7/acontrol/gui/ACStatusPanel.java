package de.arial7.acontrol.gui;

import java.awt.Component;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.Insets;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.border.Border;

import de.arial7.acontrol.base.Settings;

@SuppressWarnings("serial")
public class ACStatusPanel extends JPanel {

	private boolean isConnected;

	private JLabel connectionStatus = new JLabel("getrennt");

	public ACStatusPanel() {
		setLayout(new FlowLayout(FlowLayout.LEFT));

		add(new JLabel("Verbindung: "));
		add(connectionStatus);
		
		add(new JSeparator(JSeparator.VERTICAL));
		
		add(new JLabel("Baudrate: "));
		add(new JLabel(String.valueOf(Settings.BAUDRATE)));
		
		
	}

	public void setConnectionStatus(boolean connection) {
		isConnected = connection;
		if (isConnected)
			connectionStatus.setText("verbunden");
		else
			connectionStatus.setText("getrennt");
	}

	public boolean getConnectionStatus() {
		return isConnected;

	}

}
