/**
 * Author: Pascal Riesinger
 * Name: AControl
 * Version: 2.0
 * Package: de.arial7.acontrol.base
 * Class: Main
 */

package de.arial7.acontrol.base;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.UIManager;

import org.zu.ardulink.Link;
import org.zu.ardulink.RawDataListener;

import de.arial7.acontrol.gui.ACMenuBar;
import de.arial7.acontrol.gui.ACStatusPanel;
import de.arial7.acontrol.gui.AConsole;
import de.arial7.acontrol.gui.MainPane;
import de.arial7.acontrol.plan.PlanParser;

public class Main extends JFrame {

	private static final long serialVersionUID = 1L;

	private MainPane mainPane;
	private static AConsole aconsole;
	private static ACStatusPanel statusPanel;

	public static void main(String[] args) {
		System.out.println("AControl - Version " + Reference.VERSION);
		System.out.println("© 2015 Pascal Riesinger");

		EventQueue.invokeLater(new Runnable() {
			public void run() {
				Settings.loadAllSettings();
				Images.loadImages();
				States.init(ProjectHandler
						.getProjectValue(ProjectHandler.KEY_STATES_LOCATION));
				States.loadStates();
				try {
					UIManager.setLookAndFeel(UIManager
							.getSystemLookAndFeelClassName());
					Main frame = new Main();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});

	}

	/**
	 * Create the frame.
	 */
	public Main() {
		setTitle("AControl - Version: " + Reference.VERSION
				+ " - © Pascal Riesinger");
		setIconImage(Images.ICON);
		addWindowListener(new WindowAdapter() {
			@Override
			public void windowClosing(WindowEvent e) {
				States.saveStates();
			}
		});
		setSize(Reference.WIDTH, Reference.HEIGHT);
		setResizable(true);
		setLayout(new BorderLayout());

		ACMenuBar menuBar = new ACMenuBar();
		setJMenuBar(menuBar);
		

		mainPane = new MainPane();
		PlanParser
				.loadPlanToPanel(
						ProjectHandler.getProjectValue(ProjectHandler.KEY_PLAN_LOCATION),
						mainPane);
		mainPane.init();
		add(mainPane, "Center");

		
		statusPanel = new ACStatusPanel();
		add(statusPanel, "South");
		
		aconsole = new AConsole();
		if (Settings.SHOW_CONSOLE)
			add(new JScrollPane(aconsole), "East");

		Utils.output("AControl - Version: " + Reference.VERSION
				+ " - © Pascal Riesinger", Utils.LVL_INFO);

		// remove(aconsole);
		// pack();

		setVisible(true);

		/*
		 * Code to print to stdout messages from Arduino
		 */
		Link.getDefaultInstance().addRawDataListener(new RawDataListener() {

			@Override
			public void parseInput(String id, int numBytes, int[] message) {
				System.out.println("MSG REC");
				StringBuilder build = new StringBuilder(numBytes + 1);
				for (int i = 0; i < numBytes; i++) {
					build.append((char) message[i]);
				}
				System.out.print("MSG: \t");
				System.out.println(build.toString());
			}
		});
	}

	public static void exit(boolean errorsOccured) {
		Link.getDefaultInstance().sendCustomMessage("disconnect");
		if (errorsOccured) {
			System.out.println("INFO: Exiting with fatal errors");
			System.exit(1);
		} else {
			System.out.println("INFO: Exiting without any errors");
			System.exit(0);

		}
	}

	public static AConsole getConsole() {
		return aconsole;
	}

	public static ACStatusPanel getStatusPanel() {
		return statusPanel;
	}
}
