import fs from 'node:fs';
import path from 'node:path';
import shell from 'shelljs';
import { BaseHandler } from './handler';

export class DependencyHandler extends BaseHandler {
  public handle(request: {
    [key: string]: string | boolean;
  }): { [key: string]: string | boolean } | null {
    if (request['packageManager'] !== undefined) {
      const packageManager = request['packageManager'] as string;
      const projectPath = request['project'] as string;

      const hasPackageJson = fs.existsSync(
        path.join(projectPath, 'package.json')
      );

      if (hasPackageJson) {
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
      }
      return super.handle(request);
    }
    return request;
  }
}
