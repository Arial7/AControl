package de.arial7.acontrol.base;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class States {
	public static Sts[] states;
	public static File statesFile;

	public static void init(String statesFilePath) {
		states = new Sts[20];
		statesFile = new File(statesFilePath);
	}

	public static void loadStates() {
		System.out.println("INFO: Reading file '" + statesFile.getName() + "'");
		if (!Utils.isFileAvailable(statesFile.getPath()))
			if (Utils.createFile(statesFile))
				for (int k = 0; k < states.length; k++)
					states[k] = Sts.L;

		try {
			BufferedReader statesReader = new BufferedReader(new FileReader(
					statesFile));
			String zeile = null;
			int i = 0;
			while ((zeile = statesReader.readLine()) != null) {
				if (zeile.charAt(0) == 'L')
					states[i] = Sts.L;
				else if (zeile.charAt(0) == 'R')
					states[i] = Sts.R;
				else {
					System.err
							.println("FATAL: Incorrect state present in file '"
									+ statesFile.getName()
									+ "' '"
									+ zeile.charAt(0)
									+ "'"
									+ ". Please check file and correct to 'L' or 'R'");
					Main.exit(true);
				}

				i++;

			}
			statesReader.close();
			System.out.println("INFO: Finished reading file '"
					+ statesFile.getName() + "'");

		} catch (IOException e) {
			System.err.println("FATAL: Error while reading file '"
					+ statesFile.getName()
					+ "', check if it exists and has 20 lines.");
			e.printStackTrace();
			Main.exit(true);
		}
	}

	public static void saveStates() {
		System.out.println("INFO: Saving file '" + statesFile.getName() + "'");
		if (Utils.isFileAvailable(statesFile.getPath())
				|| Utils.createFile(statesFile)) {
			try {
				BufferedWriter statesWriter = new BufferedWriter(
						new FileWriter(statesFile));
				String zeile = null;
				int i = 0;
				while (i < states.length) {
					if (states[i] == Sts.L)
						zeile = "L" + "\n";
					else if (states[i] == Sts.R)
						zeile = "R" + "\n";
					statesWriter.write(zeile);
					i++;
				}
				statesWriter.close();
				System.out.println("INFO: Finished saving file '"
						+ statesFile.getName() + "'");
			} catch (Exception e) {
				System.err.println("ERROR: Failed to save states to '"
						+ statesFile.getName() + "', printing stack trace");
				e.printStackTrace();
				Main.exit(true);
			}
			Main.exit(false);

		}

	}
}
