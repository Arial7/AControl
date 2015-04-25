package de.arial7.acontrol.plan;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

	private static List<ImageTag> planArray = new ArrayList<ImageTag>();
	private static int planArrayIterator = 0;

	public static void loadPlanToPanel(String filepath, JPanel panel) {
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
				} else if (line.equals("D_180")) {
					panel.add(new ACLabel(Images.D_180, x, y));
					x++;
				} else if (line.equals("D_270")) {
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

	public static void loadPlanToArray(String filePath) {
		planArray = new ArrayList<ImageTag>();
		planArrayIterator = 0;
		try {
			BufferedReader reader = new BufferedReader(new FileReader(new File(
					filePath)));
			String line = null;
			while ((line = reader.readLine()) != null) {
				if (line.startsWith("***")) {
					planArray.add(ImageTag.NEWLINE);
				} else if (line.equals("-")) {
					planArray.add(ImageTag.EMPTY);
				} else if (line.equals("G_0")) {
					planArray.add(ImageTag.G_0);
				} else if (line.equals("D_0")) {
					planArray.add(ImageTag.D_0);
				} else if (line.equals("D_90")) {
					planArray.add(ImageTag.D_90);
				} else if (line.equals("D_180")) {
					planArray.add(ImageTag.D_180);
				} else if (line.equals("D_270")) {
					planArray.add(ImageTag.D_270);
				} else if (line.equals("DD_0")) {
					planArray.add(ImageTag.DD_0);
				} else if (line.equals("DD_90")) {
					planArray.add(ImageTag.DD_90);
				} else if (line.equals("P_0")) {
					planArray.add(ImageTag.P_0);
				} else if (line.equals("P_180")) {
					planArray.add(ImageTag.P_180);
				} else if (line.equals("A_0")) {
					planArray.add(ImageTag.A_0);
				} else if (line.equals("A_180")) {
					planArray.add(ImageTag.A_180);
				} else if (line.equals("W_L_0")) {
					planArray.add(ImageTag.W_L_0);
				} else if (line.equals("W_L_180")) {
					planArray.add(ImageTag.W_L_180);
				} else if (line.equals("W_R_0")) {
					planArray.add(ImageTag.W_R_0);
				} else if (line.equals("W_R_180")) {
					planArray.add(ImageTag.W_R_180);
				} else {
					System.err
							.println("[WARN]Found unexpected token in plan file, skipping it: "
									+ line);
				}
			}

			reader.close();
			Utils.output("Loaded plan", Utils.LVL_INFO);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static ImageTag getNextItem() {
		planArrayIterator++;
		if (planArrayIterator > planArray.size())
			return ImageTag.EMPTY;
		return planArray.get(planArrayIterator - 1);
	}

}
