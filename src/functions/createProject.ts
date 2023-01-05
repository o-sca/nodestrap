import fs from "node:fs";

/**
 * Creates root folder labeled with the given projectName at the targeted path.
 * @param {string} projectPath
 * @returns {boolean} true if successfully created else false
 */
export function createProject(projectPath: string): boolean {
  if (fs.existsSync(projectPath)) return false;
  fs.mkdirSync(projectPath);
  return true;
}

