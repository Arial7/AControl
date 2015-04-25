package de.arial7.acontrol.plan.editor;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSeparator;

import de.arial7.acontrol.base.ImageTag;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.base.Reference;
import de.arial7.acontrol.base.Utils;
import de.arial7.acontrol.gui.VerticalLayout;
import de.arial7.acontrol.plan.PlanParser;

@SuppressWarnings("serial")
public class PlanEditor extends JFrame {

	public static ImageTag activeTag = ImageTag.EMPTY;
	public static JLabel currentTrack = new JLabel(new ImageIcon(Images.NA));

	public PlanEditor(String fileToOpen) {
		PlanParser.loadPlanToArray(fileToOpen);
		
		setSize(1280, 720);
		setResizable(true);
		setLayout(new BorderLayout());
		setTitle("AControl - Gleisbildeditor " + Reference.VERSION + "- © Pascal Riesinger");
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);

		JPanel selectionsPanel = addControls();
		JPanel buttonsPanel = new JPanel();
		buttonsPanel.setLayout(null);
		
		buttonsPanel.setSize(1280 - selectionsPanel.getWidth(), 720);
		
		for (int y = 0; y < 18; y++) {
			for (int x = 0; x < 35; x++) {
				ImageTag t = PlanParser.getNextItem();
				if (t == ImageTag.NEWLINE) {
					System.out.println("FOUND NEWLINE, ADDING " +(35 - x));
					int x35 = 35 - x;
					x = 35;
					for (int l = x35; l > 0; l--) {
						buttonsPanel.add(new PLButton( x - l, y));
						//System.out.print(" l = " + l);
					}
				}
				else if (t == ImageTag.EMPTY) {
					buttonsPanel.add(new PLButton(x, y));
				}
				else
					buttonsPanel.add(new PLButton(x, y, t));
			}
		}

		add(buttonsPanel, "Center");
		add(selectionsPanel, "East");

		// pack();
		setVisible(true);
	}
	
	
	public PlanEditor() {
		setSize(1280, 720);
		setResizable(true);
		setLayout(new BorderLayout());
		setTitle("AControl - Gleisbildeditor " + Reference.VERSION + "- © Pascal Riesinger");
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);

		JPanel selectionsPanel = addControls();
		JPanel buttonsPanel = new JPanel();
		buttonsPanel.setLayout(null);
		
		buttonsPanel.setSize(1280 - selectionsPanel.getWidth(), 720);
		for (int x = 0; x < 35; x++) {
			for (int y = 0; y < 18; y++) {
				buttonsPanel.add(new PLButton(x, y));
			}
		}

		add(buttonsPanel, "Center");
		add(selectionsPanel, "East");

		// pack();
		setVisible(true);
	}
	
	private static JPanel addControls() {

		JPanel selectionsPanel = new JPanel();
		
		selectionsPanel.setSize(300, 720);
		selectionsPanel.setBackground(Color.GRAY);
		selectionsPanel.setLayout(new VerticalLayout());
		

		selectionsPanel.add(new JLabel("Aktuelles Gleis:"));
		selectionsPanel.add(currentTrack);
		selectionsPanel.add(new JLabel("Verfügbare Gleise:"));
		
		
		JPanel availablePanel = new JPanel(new FlowLayout());
		JPanel availableLeft = new JPanel(new VerticalLayout());
		JPanel availableRight = new JPanel(new VerticalLayout());
		
		
		availableLeft.add(new PSButton(ImageTag.W_L_0, Images.W_L_0_L));
		availableLeft.add(new PSButton(ImageTag.W_L_180, Images.W_L_180_L));
		availableLeft.add(new PSButton(ImageTag.W_R_0, Images.W_R_0_L));
		availableLeft.add(new PSButton(ImageTag.W_R_180, Images.W_R_180_L));
		availableLeft.add(new PSButton(ImageTag.A_0, Images.A_0));
		availableLeft.add(new PSButton(ImageTag.A_180, Images.A_180));
		availableLeft.add(new PSButton(ImageTag.D_270, Images.D_270));
		availableLeft.add(new PSButton(ImageTag.D_90, Images.D_90));
		availableRight.add(new PSButton(ImageTag.DD_0, Images.DD_0));
		availableRight.add(new PSButton(ImageTag.DD_90, Images.DD_90));
		availableRight.add(new PSButton(ImageTag.G_0, Images.G_0));
		availableRight.add(new PSButton(ImageTag.P_0, Images.P_0));
		availableRight.add(new PSButton(ImageTag.P_180,  Images.P_180));
		availableRight.add(new PSButton(ImageTag.EMPTY, Images.NA));
		
		availablePanel.add(availableLeft);
		availablePanel.add(availableRight);
		
		selectionsPanel.add(availablePanel);
		
		selectionsPanel.add(new JSeparator(JSeparator.HORIZONTAL));
		
		JButton saveButton = new JButton("Speichern");
		saveButton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				
			}
		});
		selectionsPanel.add(saveButton);
		
		return selectionsPanel;
		
	}
	

	public static void changeTag() {
		currentTrack.setIcon(Utils.tagToIcon(activeTag));
	}

}
