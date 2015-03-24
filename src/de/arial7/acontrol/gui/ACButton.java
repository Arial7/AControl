package de.arial7.acontrol.gui;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;

import org.zu.ardulink.Link;

import de.arial7.acontrol.base.ImageTag;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.base.Main;
import de.arial7.acontrol.base.States;
import de.arial7.acontrol.base.Sts;
import de.arial7.acontrol.base.Utils;

public class ACButton extends JButton implements ActionListener {

	private static final long serialVersionUID = -8965117180334300412L;

	private int nr;
	private ImageTag tag;

	public int statesNo;

	public ACButton(ImageTag tag_, int x, int y, int nr) {
		this.tag = tag_;
		this.nr = nr;
		this.setSize(32, 32);
		this.setLocation(Utils.getCoordinates(x, y));
		statesNo = nr - 1;
		loadImage();
		this.addActionListener(this);

	}

	private void loadImage() {
		if (States.states[statesNo] == Sts.L)
			switch (tag) {
			case W_L_0:
				this.setImage(Images.W_L_0_R);
				break;
			case W_L_180:
				this.setImage(Images.W_L_180_R);
				break;
			case W_R_0:
				this.setImage(Images.W_R_0_R);
				break;
			case W_R_180:
				this.setImage(Images.W_R_180_R);
				break;
			default:
				System.err
						.println("ERROR: Could not load appropriate image for switch, so image will be set to 'NA'");
				System.out.println("INFO: The tag for the switch is: "
						+ String.valueOf(tag));
				this.setImage(Images.NA);
				break;
			}
		else if (States.states[statesNo] == Sts.R)
			switch (tag) {
			case W_L_0:
				this.setImage(Images.W_L_0_L);
				break;
			case W_L_180:
				this.setImage(Images.W_L_180_L);
				break;
			case W_R_0:
				this.setImage(Images.W_R_0_L);
				break;
			case W_R_180:
				this.setImage(Images.W_R_180_L);
				break;
			default:
				break;
			}
	}

	@Override
	public void actionPerformed(ActionEvent arg0) {
		if (Main.getStatusPanel().getConnectionStatus()) {
			String command;
			if (States.states[statesNo] == Sts.L) {
				command = "AC~" + String.valueOf(nr) + "~0";
				States.states[statesNo] = Sts.R;
			} else {
				command = "AC~" + String.valueOf(nr) + "~1";
				States.states[statesNo] = Sts.L;
			}
			loadImage();
			Link.getDefaultInstance().sendCustomMessage(command);
			Utils.output("Weiche # " + nr + " geschaltet, Status: "
					+ States.states[statesNo].toString() + " Befehl: "
					+ command, Utils.LVL_INFO);
		}
		else {
			JDialog warnDialog = new JDialog();
			warnDialog.setTitle("AControl - Warnung");
			warnDialog.setModal(true);
			//warnDialog.setSize(750, 200);
			warnDialog.setResizable(false);
			warnDialog.setLayout(new GridLayout(2, 1));
			JLabel warnText = new JLabel("<html>Bevor Sie Weichen schalten können, müssen Sie sich mit einer"
					+ "<br>ASwitch verbinden. Drücken Sie dazu auf den Knopf &quot;Verbinden&quot;.</html>");
			warnDialog.add(warnText);
			JButton dismissButton = new JButton("OK");
			dismissButton.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent e) {
					warnDialog.dispose();
					
				}
			});
			warnDialog.add(dismissButton);
			warnDialog.pack();
			warnDialog.setVisible(true);
			
		}
	}

	private void setImage(BufferedImage img) {
		this.setIcon(new ImageIcon(img));
	}

}
