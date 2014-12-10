package de.arial7.acontrol.gui;

import javax.swing.JPanel;

import de.arial7.acontrol.ardulinkredone.ConnectButton;
import de.arial7.acontrol.ardulinkredone.ConnectionStatus;
import de.arial7.acontrol.ardulinkredone.DisconnectButton;
import de.arial7.acontrol.ardulinkredone.SerialConnectionPanel;
import de.arial7.acontrol.base.Main;

/**
 * @file ConnectionManagerPanel.java
 * @author pascal
 */
@SuppressWarnings("serial")
public class ConnectionManagerPanel extends JPanel{
	
	public ConnectionManagerPanel(){
		setBounds(0, 0, Main.WIDTH, 50);
		/*
		 * GUI to select connection port
		 */
		SerialConnectionPanel serialConnectionPanel = new SerialConnectionPanel();
		serialConnectionPanel.setBounds(0, 0, Main.WIDTH / 2, 50);
		add(serialConnectionPanel);

		/*
		 * Code for connect and disconnect buttons
		 */
		JPanel connectPanel = new JPanel();
		//mainPane.add(connectPanel);

		ConnectButton btnConnect = new ConnectButton(serialConnectionPanel);
		connectPanel.add(btnConnect);

		DisconnectButton btnDisconnect = new DisconnectButton();
		connectPanel.add(btnDisconnect);

		ConnectionStatus connectionStatus = new ConnectionStatus();
		connectPanel.add(connectionStatus);
		connectPanel.setBounds(Main.WIDTH / 2, 0, Main.WIDTH / 2, 50);
		add(connectPanel);
	}
}
