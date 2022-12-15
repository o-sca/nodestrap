import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";

/**
 * Recursively copy of contents from template folder to the new 
 * targeted project folder.
 * @param {string} templatePath
 * @param {string} projectName
 * @param {string} authorName
 * @param {string} currDir
 */
export function createDirContents(
  templatePath: string,
  projectName: string,
  authorName: string,
  currDir: string
): void {
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
      createDirContents(
        path.join(templatePath, file),
        path.join(projectName, file),
        authorName,
        currDir
      );
    }
  })
}

