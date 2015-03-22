package de.arial7.acontrol.plan;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import javax.swing.JPanel;

import de.arial7.acontrol.base.ImageTag;
import de.arial7.acontrol.base.Images;
import de.arial7.acontrol.base.Utils;
import de.arial7.acontrol.gui.ACButton;
import de.arial7.acontrol.gui.ACLabel;

public class PlanParser {

	/**
	 * This loads a *.acp file and adds all the objects to the given JPanel
	 * 
	 * @param filepath
	 *            the *.acp file to load
	 * @param panel
	 *            the JPanel, all the objects will be added to
	 */
	
	public static int loadedX;
	public static int loadedY;
	
	public static void loadPlan(String filepath, JPanel panel) {
		int switchID = 1;
		int x = 0;
		int y = 0;
		try {
			BufferedReader reader = new BufferedReader(new FileReader(new File(
					filepath)));
			String line = null;
			while ((line = reader.readLine()) != null) {
				if (line.startsWith("***")) {
					y++;
					x = 0;
				} else if (line.equals("-")) {
					x++;
				} else if (line.equals("G_0")) {
					panel.add(new ACLabel(Images.G_0, x, y));
					x++;
				} else if (line.equals("D_0")) {
					panel.add(new ACLabel(Images.D_0, x, y));
					x++;
				} else if (line.equals("D_90")) {
					panel.add(new ACLabel(Images.D_90, x, y));
					x++;
				}else if (line.equals("D_180")) {
					panel.add(new ACLabel(Images.D_180, x, y));
					x++;
				}else if (line.equals("D_270")) {
					panel.add(new ACLabel(Images.D_270, x, y));
					x++;
				} else if (line.equals("DD_0")) {
					panel.add(new ACLabel(Images.DD_0, x, y));
					x++;
				} else if (line.equals("DD_90")) {
					panel.add(new ACLabel(Images.DD_90, x, y));
					x++;
				} else if (line.equals("P_0")) {
					panel.add(new ACLabel(Images.P_0, x, y));
					x++;
				} else if (line.equals("P_180")) {
					panel.add(new ACLabel(Images.P_180, x, y));
					x++;
				} else if (line.equals("A_0")) {
					panel.add(new ACLabel(Images.A_0, x, y));
					x++;
				} else if (line.equals("A_180")) {
					panel.add(new ACLabel(Images.A_180, x, y));
					x++;
				} else if (line.equals("W_L_0")) {
					panel.add(new ACButton(ImageTag.W_L_0, x, y, switchID));
					switchID++;
					x++;
				} else if (line.equals("W_L_180")) {
					panel.add(new ACButton(ImageTag.W_L_180, x, y, switchID));
					switchID++;
					x++;
				} else if (line.equals("W_R_0")) {
					panel.add(new ACButton(ImageTag.W_R_0, x, y, switchID));
					switchID++;
					x++;
				} else if (line.equals("W_R_180")) {
					panel.add(new ACButton(ImageTag.W_R_180, x, y, switchID));
					switchID++;
					x++;
				} else {
					System.err
							.println("[WARN]Found unexpected token in plan file, skipping it: "
									+ line);
					x++;
				}
				loadedX = x;
				loadedY = y;
				
			}
			
			reader.close();
			Utils.output("Loaded plan", Utils.LVL_INFO);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
