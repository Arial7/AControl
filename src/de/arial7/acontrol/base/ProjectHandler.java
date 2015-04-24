package de.arial7.acontrol.base;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import javax.swing.JFileChooser;
import javax.swing.filechooser.FileNameExtensionFilter;

import de.arial7.acontrol.plan.editor.PlanEditor;

public class ProjectHandler {

	public static final String KEY_PROJECT_NAME = "projectName";
	public static final String KEY_PLAN_LOCATION = "planLocation";
	public static final String KEY_STATES_LOCATION = "statesLocation";
	
	public static String currentProject = Reference.projectDir + "MEK/mek.ac";

	public static void openProject() {
//		FileDialog fd = new FileDialog(new JFrame(), "Öffnen", FileDialog.LOAD);
//		fd.setDirectory(Reference.projectDir);
//		fd.setFile("*.ac;");
//		fd.setVisible(true);
		
		JFileChooser fc = new JFileChooser(Reference.projectDir);
		fc.setFileFilter(new FileNameExtensionFilter("AControl Project Files", "ac"));
		fc.showOpenDialog(Main.getStatusPanel());
	}

	public static void createProject() {
		new PlanEditor();
	}

	public static void editProject() {
		new PlanEditor(getProjectValue(KEY_PLAN_LOCATION));
		
	}

	public static String getProjectValue(String key) {
		String path = null;

		try {
			BufferedReader reader = new BufferedReader(new FileReader(
					currentProject));
			String l = null;
			while ((l = reader.readLine()) != null) {
				if (l.startsWith(key)){
					path = Reference.projectDir + l.substring(l.indexOf("=") + 1);
					break;
				}
			}

			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return path;
	}
	



}
