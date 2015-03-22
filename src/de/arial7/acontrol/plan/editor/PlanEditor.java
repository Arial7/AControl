package de.arial7.acontrol.plan.editor;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

import de.arial7.acontrol.base.ImageTag;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.gui.VerticalLayout;

@SuppressWarnings("serial")
public class PlanEditor extends JFrame {

	public static ImageTag activeTag = ImageTag.EMPTY;
	public static JLabel currentTrack = new JLabel(new ImageIcon(Images.NA));

	public PlanEditor() {
		setSize(1280, 720);
		setResizable(true);
		setLayout(new BorderLayout());
		setTitle("AControl - Gleisbildeditor - © Pascal Riesinger");
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);

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
		
		availablePanel.add(availableLeft);
		availablePanel.add(availableRight);
		
		selectionsPanel.add(availablePanel);
		
		
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

	public static void changeTag() {
		switch (activeTag) {
		case EMPTY:
			currentTrack.setIcon(new ImageIcon(Images.NA));
			break;
		case W_L_0:
			currentTrack.setIcon(new ImageIcon(Images.W_L_0_L));
			break;
		case W_L_180:
			currentTrack.setIcon(new ImageIcon(Images.W_L_180_L));
			break;
		case W_R_0:
			currentTrack.setIcon(new ImageIcon(Images.W_R_0_L));
			break;
		case W_R_180:
			currentTrack.setIcon(new ImageIcon(Images.W_R_180_L));
			break;
		case A_0:
			currentTrack.setIcon(new ImageIcon(Images.A_0));
			break;
		case A_180:
			currentTrack.setIcon(new ImageIcon(Images.A_180));
			break;
		case DD_0:
			currentTrack.setIcon(new ImageIcon(Images.DD_0));
			break;
		case DD_90:
			currentTrack.setIcon(new ImageIcon(Images.DD_90));
			break;
		case D_270:
			currentTrack.setIcon(new ImageIcon(Images.D_270));
			break;
		case D_90:
			currentTrack.setIcon(new ImageIcon(Images.D_90));
			break;
		case G_0:
			currentTrack.setIcon(new ImageIcon(Images.G_0));
			break;
		case P_0:
			currentTrack.setIcon(new ImageIcon(Images.P_0));
			break;
		case P_180:
			currentTrack.setIcon(new ImageIcon(Images.P_180));
			break;
		default:
			currentTrack.setIcon(new ImageIcon(Images.NA));
			break;
		
		}
	}

}
