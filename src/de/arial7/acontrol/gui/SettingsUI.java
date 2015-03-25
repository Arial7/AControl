package de.arial7.acontrol.gui;

import java.awt.Cursor;
import java.awt.Desktop;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import de.arial7.acontrol.base.Reference;
import de.arial7.acontrol.base.Settings;

@SuppressWarnings("serial")
public class SettingsUI extends JFrame {

	public SettingsUI() {

		
		setSize(Reference.WIDTH >> 1, Reference.HEIGHT >> 1);
		setResizable(false);
		setLayout(new VerticalLayout());
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);

		final JCheckBox show_console_checkbox = new JCheckBox(
				"Debuggingkonsole anzeigen (*)");
		show_console_checkbox.setSelected(Settings.SHOW_CONSOLE);
		show_console_checkbox.setAlignmentX(JCheckBox.CENTER_ALIGNMENT);
		add(show_console_checkbox);
		// /
		JPanel baudRatePanel = new JPanel(new FlowLayout());

		JLabel baudRateDescription = new JLabel("Baudrate (*):");
		baudRatePanel.add(baudRateDescription);
		// /
		JTextField baudRateField = new JTextField();
		baudRateField.setText(String.valueOf(Settings.BAUDRATE));
		baudRatePanel.add(baudRateField);
		add(baudRatePanel);
		// /
		JLabel restartWarn = new JLabel(
				"<html><br>(*) Diese Option benötigt einen Neustart von AControl</html>");
		// restartWarn.setHorizontalAlignment(JLabel.CENTER);
		restartWarn.setAlignmentX(JLabel.CENTER_ALIGNMENT);
		add(restartWarn);
		// /
		JLabel updateHelpLabel = new JLabel("<html>Aktualisierungen und Hilfe finden Sie unter <a href='http://github.com/Arial7/AControl'>github.com/Arial7/AControl</a></html>");
		updateHelpLabel.setCursor(new Cursor(Cursor.HAND_CURSOR));
		updateHelpLabel.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e){
				try {
					Desktop.getDesktop().browse(new URI("http://www.github.com/Arial7/AControl"));
				} catch (URISyntaxException | IOException ex) {
					
				}
			}
			
		});
		add(updateHelpLabel);
		
		JPanel actionsPanel = new JPanel();
		actionsPanel.setLayout(new FlowLayout());
		// ///
		JButton closeButton = new JButton("Abbrechen");
		closeButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				setVisible(false);
				dispose();
			}
		});
		actionsPanel.add(closeButton);
		JButton saveButton = new JButton("Speichern");
		saveButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Settings.SHOW_CONSOLE = show_console_checkbox.isSelected();
				Settings.BAUDRATE = Integer.valueOf(baudRateField.getText());

				Settings.saveAllSettings();
				setVisible(false);
				dispose();
			}
		});
		actionsPanel.add(saveButton);
		add(actionsPanel);
		pack();
		setVisible(true);
	}
}
