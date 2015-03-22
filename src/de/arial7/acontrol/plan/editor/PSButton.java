package de.arial7.acontrol.plan.editor;

import java.awt.event.ActionEvent;
import java.awt.image.BufferedImage;

import javax.swing.ImageIcon;
import javax.swing.JButton;

import de.arial7.acontrol.base.ImageTag;

@SuppressWarnings("serial")
public class PSButton extends JButton {
	
	ImageTag tag;
	
	public PSButton(ImageTag tag, BufferedImage image){
		setSize(32,32);
		setIcon(new ImageIcon(image));
		this.tag = tag;
	}
	
	@Override
	protected void fireActionPerformed(ActionEvent event) {
		PlanEditor.activeTag = tag;
		PlanEditor.changeTag();
		super.fireActionPerformed(event);
	} 
	
}
