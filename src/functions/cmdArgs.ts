import fs from "node:fs";
import path from "node:path";
import shell, { ShellString } from "shelljs";
import { Manager, Options } from "../types";

/**
 * Installs all dependencies within the targetPath's package.json
 * depending on the packageManger chosen.
 * @param {Options} options
 * @returns {boolean} true if package.json exists else false
 */
export function installDeps(options: Options): boolean {
  const isNode: boolean = fs.existsSync(path.join(options.templatePath, 'package.json'));

  if (isNode) {
    shell.cd(options.targetPath);

    let result: ShellString;

    switch (options.packageManager) {
      case Manager.npm:
        result = shell.exec('npm install');
        return result.code === 0;
      case Manager.pnpm:
        result = shell.exec('pnpm install');
        return result.code === 0;
      case Manager.yarn:
        result = shell.exec('yarn install');
        return result.code === 0;
      case Manager.default:
        return true;
      default:
        // This shouldn't happen. xD
        return false;
    }
  }
  return false;
}

/**
 * Executes the git init command in the targetPath.
 * @returns {boolean} if execution was successful else false
 */
export function execGitInit(options: Options): boolean {
  if (options.gitInit) {
    shell.cd(options.targetPath);
    const result: ShellString = shell.exec('git init')
    return result.code === 0;
  }
  return true;
}
