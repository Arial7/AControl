package de.arial7.acontrol.plan.editor;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;

import de.arial7.acontrol.base.ImageTag;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.base.Utils;

@SuppressWarnings("serial")
public class PLButton extends JButton{

	ImageTag tag;
	int x, y;
	
	public PLButton(int x, int y){
		this.setLocation(Utils.getCoordinates(x, y));
		this.setSize(new Dimension(32, 32));
		this.x = x; 
		this.y = y;
		
		addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				tag = PlanEditor.activeTag;	
				refreshImage();
			}
		});
	}
	
	private void refreshImage(){
		switch(tag){
		case A_0:
			setIcon(new ImageIcon(Images.A_0));
			break;
		case A_180:
			setIcon(new ImageIcon(Images.A_180));
			break;
		case DD_0:
			setIcon(new ImageIcon(Images.DD_0));
			break;
		case DD_90:
			setIcon(new ImageIcon(Images.DD_90));
			break;
		case D_270:
			setIcon(new ImageIcon(Images.D_270));
			break;
		case D_90:
			setIcon(new ImageIcon(Images.D_90));
			break;
		case EMPTY:
			setIcon(null);
			break;
		case G_0:
			setIcon(new ImageIcon(Images.G_0));
			break;
		case P_0:
			setIcon(new ImageIcon(Images.P_0));
			break;
		case P_180:
			setIcon(new ImageIcon(Images.P_180));
			break;
		case W_L_0:
			setIcon(new ImageIcon(Images.W_L_0_L));
			break;
		case W_L_180:
			setIcon(new ImageIcon(Images.W_L_180_L));
			break;
		case W_R_0:
			setIcon(new ImageIcon(Images.W_R_0_L));
			break;
		case W_R_180:
			setIcon(new ImageIcon(Images.W_R_180_L));
			break;
		default:
			setIcon(null);
			break;
		
		}
		
	}
	
}
