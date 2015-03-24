package de.arial7.acontrol.base;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import de.arial7.acontrol.plan.editor.PlanEditor;

public class ProjectHandler {

	public static final String PLANKEY = "planLocation";
	public static final String STATESKEY = "statesLocation";
	
	public static String currentProject = Reference.projectDir + "MEK/mek.ac";

	public static void openProject() {

	}

	public static void createProject() {
		new PlanEditor();
	}

	public static void editProject() {
		new PlanEditor();
	}

	public static String getProjectFile(String key) {
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
