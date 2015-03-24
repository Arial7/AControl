package de.arial7.acontrol.gui;

import java.awt.FlowLayout;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

import javax.swing.DefaultComboBoxModel;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

import org.zu.ardulink.Link;
import org.zu.ardulink.gui.Linkable;
import org.zu.ardulink.protocol.ReplyMessageCallback;

import de.arial7.acontrol.ardulinkredone.ConnectButton;
import de.arial7.acontrol.ardulinkredone.ConnectionStatus;
import de.arial7.acontrol.ardulinkredone.DisconnectButton;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.base.Settings;


public class ConnectionPanel extends JPanel implements Linkable {

	private static final long serialVersionUID = 5227714506568515129L;
	
	@SuppressWarnings("rawtypes")
	private JComboBox connectionPortComboBox;
	private JTextField baudRateTextField;
	private JButton discoverButton;
	private ConnectButton connectButton;
	private DisconnectButton disconnectButton;
	private ConnectionStatus connectionStatus;

	private Link link = Link.getDefaultInstance();

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ConnectionPanel() {

		setLayout(new FlowLayout());

		JLabel connectionPortLabel = new JLabel("Port:");
		connectionPortLabel.setHorizontalAlignment(SwingConstants.LEFT);
		add(connectionPortLabel);

		connectionPortComboBox = new JComboBox();
		connectionPortComboBox.addItem(new String("Keine Ports gefunden"));
		add(connectionPortComboBox);

		discoverButton = new JButton("");
		discoverButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				List<String> portList = link.getPortList();
				// portList = new ArrayList<String>(); // Mock code...
				// portList.add("COM19");
				// portList.add("COM20");
				if (portList != null && portList.size() > 0) {
					connectionPortComboBox.setModel(new DefaultComboBoxModel(
							portList.toArray()));
				} else {
					//connectionPortComboBox.removeAllItems();
				}
			}
		});
		Image discoverImage = Images.MAGNIFIER;
		discoverImage = discoverImage.getScaledInstance(16, 16, java.awt.Image.SCALE_SMOOTH);
		discoverButton.setIcon(new ImageIcon(discoverImage));
		discoverButton.setToolTipText("Arduino suchen");
		discoverButton.setSize(16, 16);
		add(discoverButton);
		discoverButton.doClick();
//
//		JLabel lblBaudRate = new JLabel("Baudrate (NICHT ÄNDERN):");
//		lblBaudRate.setHorizontalAlignment(SwingConstants.LEFT);
//		add(lblBaudRate);

//		baudRateTextField = new JTextField();
//		baudRateTextField.setText(String.valueOf(Settings.BAUDRATE));
//		baudRateTextField.setColumns(4);
//		add(baudRateTextField);
		
		
		connectButton = new ConnectButton(getConnectionPort(), getBaudRate());
		add(connectButton);

		disconnectButton = new DisconnectButton();
		add(disconnectButton);

		connectionStatus = new ConnectionStatus();
		add(connectionStatus);
		
	}

	/**
	 * @return the connection port name selected or set
	 */
	public String getConnectionPort() {
		return connectionPortComboBox.getSelectedItem().toString();
	}

	/**
	 * @return the baud rate set
	 */
	// TODO if not numeric take default from Link class.
	public String getBaudRate() {
		return String.valueOf(Settings.BAUDRATE);
	}

	@Override
	public void setEnabled(boolean enabled) {
		super.setEnabled(enabled);
		connectionPortComboBox.setEnabled(enabled);
		baudRateTextField.setEnabled(enabled);
		discoverButton.setEnabled(enabled);
	}

	public Link getLink() {
		return link;
	}

	public void setLink(Link link) {
		this.link = link;
	}

	public boolean getConnectionStatus(){
		return ConnectionStatus.isConnected;
	}
	
	@Override
	public ReplyMessageCallback getReplyMessageCallback() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setReplyMessageCallback(ReplyMessageCallback arg0) {
		// TODO Auto-generated method stub

	}
}
