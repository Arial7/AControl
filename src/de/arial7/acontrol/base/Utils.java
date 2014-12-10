package de.arial7.acontrol.base;

import java.awt.Point;
import java.io.File;
import java.io.IOException;

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
	
	public static void output(String str, int level){
		switch(level){
		case LVL_INFO:
			System.out.println("INFO: " + str);
			Main.getConsole().append(str + "\n");
			break;
		}
	}

	/**
	 * 
	 * @param file
	 *            the file to check
	 * @param create
	 *            if file is not available, create it?
	 * @return boolean
	 * 			  is the file available?
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
		}
		catch(IOException e) {
			System.err.println("FATAL: Was unable to create file '"
					+ file.getPath() + "'");
			e.printStackTrace();
			return false;
		}
	}
}
