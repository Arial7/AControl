package de.arial7.acontrol.gui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JRadioButtonMenuItem;

import org.zu.ardulink.Link;

import de.arial7.acontrol.base.ProjectHandler;
import de.arial7.acontrol.base.Settings;
import de.arial7.acontrol.base.Utils;

@SuppressWarnings("serial")
public class ACMenuBar extends JMenuBar {

	public ACMenuBar() {
		// All of the stuff for creating, editing, and opening projects
		// Menu for the projects
		JMenu projectMenu = new JMenu("Projekt");

		JMenuItem projectOpen = new JMenuItem("Öffnen");
		projectOpen.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				ProjectHandler.openProject();
			}
		});

		JMenuItem projectNew = new JMenuItem("Neu");
		projectNew.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				ProjectHandler.createProject();
			}
		});

		JMenuItem projectEdit = new JMenuItem("Gleisbild bearbeiten");
		projectEdit.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				ProjectHandler.editProject();
			}
		});

		projectMenu.add(projectOpen);
		projectMenu.add(projectNew);
		projectMenu.add(projectEdit);

		// All the stuff for handling the connections
		// This is not in the order it will get added to the menu, because of
		// some dependencies
		JMenu connectionMenu = new JMenu("Verbindung");

		JMenuItem disconnectItem = new JMenuItem("Trennen");
		disconnectItem.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Link.getDefaultInstance().sendCustomMessage("disconnect");
				Link.getDefaultInstance().disconnect();

			}
		});

		final JMenu portsMenu = new JMenu("Port");

		JMenuItem connectItem = new JMenuItem("Verbinden");
		connectItem.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				String baudRateS = String.valueOf(Settings.BAUDRATE);
				String comPort = null;
				for (int i = 0; i < portsMenu.getItemCount(); i++) {
					if ((portsMenu.getItem(i)).isSelected())
						comPort = (portsMenu.getItem(i)).getText();
				}
				try {
					int baudRate = Integer.parseInt(baudRateS);
					Link.getDefaultInstance().connect(comPort, baudRate);
					Thread.sleep(2000);
					Link.getDefaultInstance().sendCustomMessage("connect");
					Utils.output("Verbunden", Utils.LVL_INFO);
				} catch (Exception ex) {
					ex.printStackTrace();
					String message = ex.getMessage();
					if (message == null || message.trim().equals("")) {
						message = "Generic Error on connection";
					}

				}
			}
		});

		JMenuItem searchPorts = new JMenuItem("Nach Geräten suchen");
		searchPorts.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				List<String> portList = Link.getDefaultInstance().getPortList();
				if (portList.size() > 0) {
					for (String port : portList) {
						portsMenu.removeAll();
						portsMenu.add(new JRadioButtonMenuItem(port));
					}
				} else {
					Utils.output("Keine Ports gefunden", Utils.LVL_INFO);
				}

			}
		});

		connectionMenu.add(connectItem);
		connectionMenu.add(disconnectItem);
		connectionMenu.addSeparator();
		connectionMenu.add(searchPorts);
		connectionMenu.add(portsMenu);

		// Some options (i.e. the settings window)
		JMenu optionsMenu = new JMenu("Optionen");
		JMenuItem optionsSettings = new JMenuItem("Einstellungen");
		optionsSettings.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Settings.showSettingsPanel();
			}
		});
		optionsMenu.add(optionsSettings);

		// Finally, add all the menus to the menu bar
		add(projectMenu);
		add(connectionMenu);
		add(optionsMenu);
		
		
		//And then search for available ports
		searchPorts.doClick();

	}

}
