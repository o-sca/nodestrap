import fs from 'node:fs';
import path from 'node:path';
import ejs from 'ejs';

export class Craft {
  /**
   * Creates root folder labeled with the given projectName at the targeted path.
   * @param {string} path
   * @returns {boolean} true if successfully created else false
   */
  public static project(path: string): boolean {
    if (fs.existsSync(path)) return false;
    fs.mkdirSync(path);
    return true;
  }

  /**
   * Recursively copy of contents from template folder to the new
   * targeted project folder.
   * @param {string} templatePath
   * @param {string} projectName
   * @param {string} authorName
   * @param {string} currDir
   */
  public static dir(
    templatePath: string,
    projectName: string,
    authorName: string,
    currDir: string
  ) {
    const filesToCreate: string[] = fs.readdirSync(templatePath);

    filesToCreate.forEach((file: string) => {
      const origFilePath = `${templatePath}/${file}`;

      const stats: fs.Stats = fs.statSync(origFilePath);
      if (stats.isFile()) {
        let contents: string = fs.readFileSync(origFilePath, 'utf-8');
        contents = ejs.render(contents, { projectName, authorName });
        const writePath: string = path.join(currDir, projectName, file);

        fs.writeFileSync(writePath, contents, 'utf-8');
      } else if (stats.isDirectory()) {
        fs.mkdirSync(path.join(currDir, projectName, file));
        this.dir(
          path.join(templatePath, file),
          path.join(projectName, file),
          authorName,
          currDir
        );
      }
    });
  }
}
