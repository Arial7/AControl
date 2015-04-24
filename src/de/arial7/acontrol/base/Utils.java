package de.arial7.acontrol.base;

import java.awt.Point;
import java.io.File;
import java.io.IOException;

import javax.swing.ImageIcon;

public class Utils {
	public static final int LVL_INFO = 0;
	public static final int LVL_WARN = 1;
	public static final int LVL_ERR = 2;
	public static final int LVL_FATAL = 3;

	public static final int OFFSET_LEFT = 32;
	public static final int OFFSET_TOP = 50;

	public static Point getCoordinates(int x, int y) {
		int x_ = (x * 32) + OFFSET_LEFT;
		int y_ = (y * 32) + OFFSET_TOP;

		return new Point(x_, y_);

	}

	public static void output(String str, int level) {
		switch (level) {
		case LVL_INFO:
			if (Main.getConsole() != null)
				Main.getConsole().append("[INFO] " + str + "\n");
			else
				System.out.println("INFO: " + str);
			break;
		}
	}

	/**
	 * 
	 * @param file
	 *            the file to check
	 * @param create
	 *            if file is not available, create it?
	 * @return boolean is the file available?
	 */
	public static final boolean isFileAvailable(String filePath) {
		File file = new File(filePath);
		if (!file.exists()) {
			System.out.println("WARN: File '" + filePath + "' doesn't exist");
			return false;
		}
		return true;
	}

	public static boolean createFile(File file) {
		try {
			file.createNewFile();
			System.out.println("INFO: Successfully created file '"
					+ file.getName() + "'");
			return true;
		} catch (IOException e) {
			System.err.println("FATAL: Was unable to create file '"
					+ file.getPath() + "'");
			e.printStackTrace();
			return false;
		}
	}

	public static ImageIcon tagToIcon(ImageTag tag) {
		switch (tag) {
		case EMPTY:
			return (new ImageIcon(Images.NA));

		case W_L_0:
			return (new ImageIcon(Images.W_L_0_L));

		case W_L_180:
			return (new ImageIcon(Images.W_L_180_L));

		case W_R_0:
			return (new ImageIcon(Images.W_R_0_L));

		case W_R_180:
			return (new ImageIcon(Images.W_R_180_L));

		case A_0:
			return (new ImageIcon(Images.A_0));

		case A_180:
			return (new ImageIcon(Images.A_180));

		case DD_0:
			return (new ImageIcon(Images.DD_0));

		case DD_90:
			return (new ImageIcon(Images.DD_90));

		case D_270:
			return (new ImageIcon(Images.D_270));

		case D_90:
			return (new ImageIcon(Images.D_90));

		case G_0:
			return (new ImageIcon(Images.G_0));

		case P_0:
			return (new ImageIcon(Images.P_0));

		case P_180:
			return (new ImageIcon(Images.P_180));
		default:
			return (new ImageIcon(Images.NA));

		}
	}

}
