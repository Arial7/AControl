package de.arial7.acontrol.gui;

import java.awt.FlowLayout;

import javax.swing.JLabel;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class ACStatusPanel extends JPanel {

	private boolean isConnected;

	private JLabel connectionStatus = new JLabel("getrennt");

	public ACStatusPanel() {
		setLayout(new FlowLayout());

		add(new JLabel("Verbindung: "));
		add(connectionStatus);

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
