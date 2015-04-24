package de.arial7.acontrol.plan.editor;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import de.arial7.acontrol.base.ImageTag;
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
	
	public PLButton(int x, int y, ImageTag tag_) {
		this.setLocation(Utils.getCoordinates(x, y));
		this.setSize(new Dimension(32, 32));
		this.x = x; 
		this.y = y;
		this.tag = tag_;
		refreshImage();
		
		addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				tag = PlanEditor.activeTag;	
				refreshImage();
			}
		});
	}
	
	private void refreshImage(){
			setIcon(Utils.tagToIcon(tag));
		
	}
	
}
