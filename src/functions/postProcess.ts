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
export function postProcess(options: Options): boolean {
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
      default:
        // This shouldn't happen. xD
        return false;
    }
  }
  return false;
}
