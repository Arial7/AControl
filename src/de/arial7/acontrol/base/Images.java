package de.arial7.acontrol.base;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

public class Images {

	public static BufferedImage A_0 = null;
	public static BufferedImage A_180 = null;
	public static BufferedImage D_0 = null;
	public static BufferedImage D_90 = null;
	public static BufferedImage D_180 = null;
	public static BufferedImage D_270 = null;
	public static BufferedImage DD_0 = null;
	public static BufferedImage DD_90 = null;
	public static BufferedImage G_0 = null;
	public static BufferedImage NA = null;
	public static BufferedImage P_0 = null;
	public static BufferedImage P_180 = null;
	public static BufferedImage W_L_0_L = null;
	public static BufferedImage W_L_0_R = null;
	public static BufferedImage W_L_180_L = null;
	public static BufferedImage W_L_180_R = null;
	public static BufferedImage W_R_0_L = null;
	public static BufferedImage W_R_0_R = null;
	public static BufferedImage W_R_180_L = null;
	public static BufferedImage W_R_180_R = null;
	
	public static Image MAGNIFIER = null;
	public static Image ICON = null;

	public static void loadImages() {
		String dir = "./res/images/";
		try {
			ICON = ImageIO.read(new File(dir + "icon.png"));
			MAGNIFIER = ImageIO.read(new File(dir + "magnifier.png"));
			
			A_0 = ImageIO.read(new File(dir + "A_0.png"));
			A_180 = ImageIO.read(new File(dir + "A_180.png"));
			D_0 = ImageIO.read(new File(dir + "D_0.png"));
			D_90 = ImageIO.read(new File(dir + "D_90.png"));
			D_180 = ImageIO.read(new File(dir + "D_180.png"));
			D_270 = ImageIO.read(new File(dir + "D_270.png"));
			DD_0 = ImageIO.read(new File(dir + "DD_0.png"));
			DD_90 = ImageIO.read(new File(dir + "DD_90.png"));
			G_0 = ImageIO.read(new File(dir + "G_0.png"));
			NA = ImageIO.read(new File(dir + "NA.png"));
			P_0 = ImageIO.read(new File(dir + "P_0.png"));
			P_180 = ImageIO.read(new File(dir + "P_180.png"));
			W_L_0_L = ImageIO.read(new File(dir + "W_L_0_L.png"));
			W_L_0_R = ImageIO.read(new File(dir + "W_L_0_R.png"));
			W_L_180_L = ImageIO.read(new File(dir + "W_L_180_L.png"));
			W_L_180_R = ImageIO.read(new File(dir + "W_L_180_R.png"));
			W_R_0_L = ImageIO.read(new File(dir + "W_R_0_L.png"));
			W_R_0_R = ImageIO.read(new File(dir + "W_R_0_R.png"));
			W_R_180_L = ImageIO.read(new File(dir + "W_R_180_L.png"));
			W_R_180_R = ImageIO.read(new File(dir + "W_R_180_R.png"));

			
		} catch (Exception e) {
			System.out
					.println("FATAL: Error while loading Images - printing stacktrace and terminating");
			e.printStackTrace();
			Main.exit(true);
		}
	}
}
