import fs from 'node:fs/promises';
import path from 'node:path';

import ejs from 'ejs';

export class Craft {
	/**
	 * Creates root folder labeled with the given projectName at the targeted path.
	 * @param {string} path
	 * @returns {boolean} true if dir does not exist yet
	 */
	public static async project(path: string): Promise<boolean> {
		try {
			await fs.stat(path);
			return true;
		} catch (err) {
			await fs.mkdir(path);
			return true;
		}
	}

	/**
	 * Recursively copy of contents from template folder to the new
	 * targeted project folder.
	 * @param {string} templatePath
	 * @param {string} projectName
	 * @param {string} authorName
	 * @param {string} currDir
	 */
	public static async dir(
		templatePath: string,
		projectName: string,
		authorName: string,
		currDir: string
	): Promise<void> {
		const files: string[] = await fs.readdir(templatePath);

		for (let i = 0; i < files.length; i++) {
			const origFilePath = `${templatePath}/${files[i]}`;

			const stats = await fs.stat(origFilePath);
			if (stats.isFile()) {
				let contents: string = await fs.readFile(origFilePath, 'utf-8');
				contents = await ejs.render(
					contents,
					{ projectName, authorName },
					{ async: true }
				);

				let writePath = '';

				if (files[i].startsWith('_')) {
					writePath = path.join(
						currDir,
						projectName,
						`.${files[i].substring(1)}`
					);
				} else {
					writePath = path.join(currDir, projectName, files[i]);
				}

				await fs.writeFile(writePath, contents, 'utf-8');
			} else if (stats.isDirectory()) {
				await fs.mkdir(path.join(currDir, projectName, files[i]));
				await this.dir(
					path.join(templatePath, files[i]),
					path.join(projectName, files[i]),
					authorName,
					currDir
				);
			}
		}
	}
}
