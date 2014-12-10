/**
 * Author: Pascal Riesinger
 * Name: AControl
 * Version: 2.0
 * Package: de.arial7.acontrol.base
 * Class: Main
 */

package de.arial7.acontrol.base;

import java.awt.EventQueue;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.UIManager;
import javax.swing.border.EmptyBorder;
import javax.swing.plaf.nimbus.NimbusLookAndFeel;

import org.zu.ardulink.Link;
import org.zu.ardulink.RawDataListener;

import de.arial7.acontrol.gui.AConsole;
import de.arial7.acontrol.gui.ConnectionManagerPanel;
import de.arial7.acontrol.gui.MainPane;

public class Main extends JFrame {

	private static final String VERSION = "2.2.0";
	private static final int BUILD = 1;
	private static final String statesFilePath = "./res/states.txt";
	public static final int WIDTH = 800;
	public static final int HEIGHT = 600;
	private static long starttime;
	
	private static final long serialVersionUID = 1L;

	private MainPane mainPane;
	private static AConsole aconsole;
	private ConnectionManagerPanel cpanel;

//	private JButton btnConnect;
//	private JButton btnDisconnect;
//	private SerialConnectionPanel serialConnectionPanel;

	

	public static void main(String[] args) {
		System.out.println("INFO: AControl version " + VERSION + " build "
				+ BUILD);
		System.out.println("INFO: © 2014 Pascal Riesinger");
		starttime = System.currentTimeMillis();
		System.out.println("INFO: Starting at: " + (starttime / 1000));
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				Images.loadImages();
				States.init(statesFilePath);
				States.loadStates();
				try {
					UIManager.setLookAndFeel(NimbusLookAndFeel.class
							.getCanonicalName());
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
		setTitle("AControl 2.2");
		setIconImage(Images.icon);
		addWindowListener(new WindowAdapter() {
			@Override
			public void windowClosing(WindowEvent e) {
				States.saveStates();

			}

		});
		setBounds(10, 10, WIDTH, HEIGHT);
		mainPane = new MainPane();
		mainPane.setBorder(new EmptyBorder(1, 1, 1, 1));
		
		aconsole = new AConsole();
		cpanel = new ConnectionManagerPanel();
	
		mainPane.add(aconsole);
		mainPane.add(cpanel);
		
		setContentPane(mainPane);

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
				System.out.print("MSG: \t") ;
				System.out.println(build.toString());
			}
		});
	}


	public static void exit(boolean errorsOccured) {
		Link.getDefaultInstance().sendCustomMessage("disconnect");
		if (errorsOccured) {
			System.out.println("INFO: Exiting with fatal errors at: "
					+ (System.currentTimeMillis() / 1000));
			System.out.println("INFO: Session duration: "
					+ ((System.currentTimeMillis() - starttime) / 1000) + "s");
			System.exit(1);
		} else {
			System.out.println("INFO: Exiting without any errors at: "
					+ (System.currentTimeMillis() / 1000));
			System.out.println("INFO: Session duration: "
					+ ((System.currentTimeMillis() - starttime) / 1000) + "s");

			System.exit(0);

		}
	}
	
	public static AConsole getConsole(){
		return aconsole;
	}
}
