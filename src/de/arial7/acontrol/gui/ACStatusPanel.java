package de.arial7.acontrol.gui;

import java.awt.FlowLayout;

import javax.swing.JLabel;
import javax.swing.JPanel;

import de.arial7.acontrol.base.ProjectHandler;
import de.arial7.acontrol.base.Settings;

@SuppressWarnings("serial")
public class ACStatusPanel extends JPanel {

	private boolean isConnected;

	private JLabel connectionStatus = new JLabel("getrennt    ");

	public ACStatusPanel() {
		setLayout(new FlowLayout(FlowLayout.LEFT));

		add(new JLabel("Verbindung: "));
		add(connectionStatus);
		
		
		add(new JLabel("Baudrate: "));
		add(new JLabel(String.valueOf(Settings.BAUDRATE) + "    " ));
		
		
		add(new JLabel("Aktuelles Projekt: "));
		add(new JLabel(ProjectHandler.getProjectValue(ProjectHandler.KEY_PROJECT_NAME) + "     "));
		
	}

	public void setConnectionStatus(boolean connection) {
		isConnected = connection;
		if (isConnected)
			connectionStatus.setText("verbunden    ");
		else
			connectionStatus.setText("getrennt    ");
	}

	public boolean getConnectionStatus() {
		return isConnected;

	}

}
