import fs from 'node:fs/promises';
import path from 'node:path';
import shell from 'shelljs';
import { BaseHandler } from './handler.js';

export class DependencyHandler extends BaseHandler {
  public async handle(request: { [key: string]: string | boolean }) {
    if (request['packageManager'] !== undefined) {
      const packageManager = request['packageManager'] as string;
      const projectPath = request['project'] as string;

      await fs.access(path.join(projectPath, 'package.json'));

      shell.cd(projectPath);

      switch (packageManager) {
        case 'npm':
          shell.exec('npm install');
          break;
        case 'pnpm':
          shell.exec('pnpm install');
          break;
        case 'yarn':
          shell.exec('yarn install');
          break;
        default:
          break;
      }
      return await super.handle(request);
    }
    return request;
  }
}
