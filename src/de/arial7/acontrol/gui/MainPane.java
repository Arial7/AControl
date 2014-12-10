package de.arial7.acontrol.gui;

import java.awt.Color;

import javax.swing.JPanel;

import de.arial7.acontrol.base.ImageTag;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.base.States;

public class MainPane extends JPanel {

	/**
	 * 
	 */
	private static final long serialVersionUID = -445140737437480983L;

	private TButton W1, W2, W3, W4, W5, W6, W7, W8, W9, W10, W11, W12, W13,
			W14, W15, W16, W17, W18, W19, W20;

	/**
	 * Create the panel.
	 */
	public MainPane() {
		setBackground(Color.WHITE);
		setForeground(Color.DARK_GRAY);
		setLayout(null);
		
		addControls();
		
	}

	

	public void saveStates() {

		States.saveStates();

	}

	private void addControls() {
		/*
		 * Erste Zeile
		 */

		add(new ACLabel(Images.P_0, 0, 0));

		add(new ACLabel(Images.G_0, 1, 0));

		add(new ACLabel(Images.G_0, 2, 0));

		W1 = new TButton(ImageTag.W_L_0, 3, 0, 1);
		add(W1);

		W2 = new TButton(ImageTag.W_L_0, 4, 0, 2);
		add(W2);

		add(new ACLabel(Images.G_0, 5, 0));

		add(new ACLabel(Images.G_0, 6, 0));

		add(new ACLabel(Images.G_0, 7, 0));

		add(new ACLabel(Images.G_0, 8, 0));

		add(new ACLabel(Images.G_0, 9, 0));

		add(new ACLabel(Images.G_0, 10, 0));

		add(new ACLabel(Images.G_0, 11, 0));

		add(new ACLabel(Images.G_0, 12, 0));

		add(new ACLabel(Images.G_0, 13, 0));

		add(new ACLabel(Images.G_0, 14, 0));

		add(new ACLabel(Images.G_0, 15, 0));

		add(new ACLabel(Images.G_0, 16, 0));

		W11 = new TButton(ImageTag.W_R_180,17, 0, 11);
		add(W11);

		W12 = new TButton(ImageTag.W_R_180,18, 0, 12);
		add(W12);

		add(new ACLabel(Images.G_0, 19, 0));

		add(new ACLabel(Images.G_0, 20, 0));

		add(new ACLabel(Images.P_180, 21, 0));

		/*
		 * Zweite Zeile
		 */

		add(new ACLabel(Images.P_0, 0, 1));

		add(new ACLabel(Images.G_0, 1, 1));

		W3 = new TButton(ImageTag.W_L_0,2, 1, 3);
		add(W3);

		add(new ACLabel(Images.DD_90, 3, 1));

		add(new ACLabel(Images.D_90, 4, 1));

		add(new ACLabel(Images.D_270, 17, 1));

		add(new ACLabel(Images.DD_0, 18, 1));

		W13 = new TButton(ImageTag.W_R_180,19, 1, 13);
		add(W13);

		add(new ACLabel(Images.G_0, 20, 1));

		add(new ACLabel(Images.P_180, 21, 1));

		/*
		 * Dritte Zeile
		 */

		add(new ACLabel(Images.P_0, 0, 2));

		add(new ACLabel(Images.G_0, 1, 2));

		add(new ACLabel(Images.DD_90, 2, 2));

		W4 = new TButton(ImageTag.W_L_180,3, 2, 4);
		add(W4);

		add(new ACLabel(Images.G_0, 4, 2));

		add(new ACLabel(Images.G_0, 5, 2));

		add(new ACLabel(Images.G_0, 6, 2));

		add(new ACLabel(Images.G_0, 7, 2));

		add(new ACLabel(Images.G_0, 8, 2));

		add(new ACLabel(Images.G_0, 9, 2));

		add(new ACLabel(Images.G_0, 10, 2));

		add(new ACLabel(Images.G_0, 11, 2));

		add(new ACLabel(Images.G_0, 12, 2));

		add(new ACLabel(Images.G_0, 13, 2));

		add(new ACLabel(Images.G_0, 14, 2));

		add(new ACLabel(Images.G_0, 15, 2));

		add(new ACLabel(Images.G_0, 16, 2));

		add(new ACLabel(Images.G_0, 17, 2));

		W14 = new TButton(ImageTag.W_R_0,18, 2, 14);
		add(W14);

		add(new ACLabel(Images.DD_0, 19, 2));

		add(new ACLabel(Images.G_0, 20, 2));

		add(new ACLabel(Images.P_180, 21, 2));

		/*
		 * Vierte Zeile
		 */

		add(new ACLabel(Images.A_0, 0, 3));

		add(new ACLabel(Images.G_0, 1, 3));

		W5 = new TButton(ImageTag.W_L_180,2, 3, 5);
		add(W5);

		add(new ACLabel(Images.G_0, 3, 3));

		add(new ACLabel(Images.G_0, 4, 3));

		add(new ACLabel(Images.G_0, 5, 3));

		add(new ACLabel(Images.G_0, 6, 3));

		add(new ACLabel(Images.G_0, 7, 3));

		add(new ACLabel(Images.G_0, 8, 3));

		add(new ACLabel(Images.G_0, 9, 3));

		add(new ACLabel(Images.G_0, 10, 3));

		add(new ACLabel(Images.G_0, 11, 3));

		add(new ACLabel(Images.G_0, 12, 3));

		add(new ACLabel(Images.G_0, 13, 3));

		add(new ACLabel(Images.G_0, 14, 3));

		add(new ACLabel(Images.G_0, 15, 3));

		add(new ACLabel(Images.G_0, 16, 3));

		add(new ACLabel(Images.G_0, 17, 3));

		add(new ACLabel(Images.G_0, 18, 3));

		W15 = new TButton(ImageTag.W_R_0, 19, 3, 15);
		add(W15);

		add(new ACLabel(Images.G_0, 20, 3));

		add(new ACLabel(Images.A_0, 21, 3));

		/*
		 * Fünfte Zeile
		 */

		add(new ACLabel(Images.A_180, 0, 4));

		add(new ACLabel(Images.G_0, 1, 4));

		W6 = new TButton(ImageTag.W_R_180, 2, 4, 6);
		add(W6);

		add(new ACLabel(Images.G_0, 3, 4));

		add(new ACLabel(Images.G_0, 4, 4));

		add(new ACLabel(Images.G_0, 5, 4));

		add(new ACLabel(Images.G_0, 6, 4));

		add(new ACLabel(Images.G_0, 7, 4));

		add(new ACLabel(Images.G_0, 8, 4));

		add(new ACLabel(Images.G_0, 9, 4));

		add(new ACLabel(Images.G_0, 10, 4));

		add(new ACLabel(Images.G_0, 11, 4));

		add(new ACLabel(Images.G_0, 12, 4));

		add(new ACLabel(Images.G_0, 13, 4));

		add(new ACLabel(Images.G_0, 14, 4));

		add(new ACLabel(Images.G_0, 15, 4));

		add(new ACLabel(Images.G_0, 16, 4));

		add(new ACLabel(Images.G_0, 17, 4));

		add(new ACLabel(Images.G_0, 18, 4));

		W16 = new TButton(ImageTag.W_L_0, 19, 4, 16);
		add(W16);

		add(new ACLabel(Images.G_0, 20, 4));

		add(new ACLabel(Images.A_180, 21, 4));

		/*
		 * Sechste Zeile
		 */

		add(new ACLabel(Images.P_0, 0, 5));

		add(new ACLabel(Images.G_0, 1, 5));

		add(new ACLabel(Images.DD_0, 2, 5));

		W7 = new TButton(ImageTag.W_R_180, 3, 5, 7);
		add(W7);

		add(new ACLabel(Images.G_0, 4, 5));

		add(new ACLabel(Images.G_0, 5, 5));

		add(new ACLabel(Images.G_0, 6, 5));

		add(new ACLabel(Images.G_0, 7, 5));

		add(new ACLabel(Images.G_0, 8, 5));

		add(new ACLabel(Images.G_0, 9, 5));

		add(new ACLabel(Images.G_0, 10, 5));

		add(new ACLabel(Images.G_0, 11, 5));

		add(new ACLabel(Images.G_0, 12, 5));

		add(new ACLabel(Images.G_0, 13, 5));

		add(new ACLabel(Images.G_0, 14, 5));

		add(new ACLabel(Images.G_0, 15, 5));

		add(new ACLabel(Images.G_0, 16, 5));

		add(new ACLabel(Images.G_0, 17, 5));

		W17 = new TButton(ImageTag.W_L_0, 18, 5, 17);
		add(W17);

		add(new ACLabel(Images.DD_90, 19, 5));

		add(new ACLabel(Images.G_0, 20, 5));

		add(new ACLabel(Images.P_180, 21, 5));

		/*
		 * Siebte Zeile
		 */

		add(new ACLabel(Images.P_0, 0, 6));

		add(new ACLabel(Images.G_0, 1, 6));

		W8 = new TButton(ImageTag.W_R_0, 2, 6, 8);
		add(W8);

		add(new ACLabel(Images.DD_0, 3, 6));

		add(new ACLabel(Images.D_0, 4, 6));

		add(new ACLabel(Images.D_180, 17, 6));

		add(new ACLabel(Images.DD_90, 18, 6));

		W18 = new TButton(ImageTag.W_L_180, 19, 6, 18);
		add(W18);

		add(new ACLabel(Images.G_0, 20, 6));

		add(new ACLabel(Images.P_180, 21, 6));

		/*
		 * Achte Zeile
		 */

		add(new ACLabel(Images.P_0, 0, 7));

		add(new ACLabel(Images.G_0, 1, 7));

		add(new ACLabel(Images.G_0, 2, 7));

		W9 = new TButton(ImageTag.W_R_0, 3, 7, 9);
		add(W9);

		W10 = new TButton(ImageTag.W_R_0, 4, 7, 10);
		add(W10);

		add(new ACLabel(Images.G_0, 5, 7));

		add(new ACLabel(Images.G_0, 6, 7));

		add(new ACLabel(Images.G_0, 7, 7));

		add(new ACLabel(Images.G_0, 8, 7));

		add(new ACLabel(Images.G_0, 9, 7));

		add(new ACLabel(Images.G_0, 10, 7));

		add(new ACLabel(Images.G_0, 11, 7));

		add(new ACLabel(Images.G_0, 12, 7));

		add(new ACLabel(Images.G_0, 13, 7));

		add(new ACLabel(Images.G_0, 14, 7));

		add(new ACLabel(Images.G_0, 15, 7));

		add(new ACLabel(Images.G_0, 16, 7));

		W19 = new TButton(ImageTag.W_L_180, 17, 7, 19);
		add(W19);

		W20 = new TButton(ImageTag.W_L_180, 18, 7, 20);
		add(W20);

		add(new ACLabel(Images.G_0, 19, 7));

		add(new ACLabel(Images.G_0, 20, 7));

		add(new ACLabel(Images.P_180, 21, 7));
	}

}
