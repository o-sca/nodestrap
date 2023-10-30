import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { BaseHandler } from './handler.js';

export class DependencyHandler extends BaseHandler {
  public async handle(request: { [key: string]: string | boolean }) {
    if (request['packageManager'] !== undefined) {
      const packageManager = request['packageManager'] as string;
      const projectPath = request['project'] as string;

      await fs.access(path.join(projectPath, 'package.json'));

      switch (packageManager) {
        case 'npm':
          execSync('npm install', { cwd: projectPath });
          break;
        case 'pnpm':
          execSync('pnpm install', { cwd: projectPath });
          break;
        case 'yarn':
          execSync('yarn install', { cwd: projectPath });
          break;
        default:
          break;
      }
      return await super.handle(request);
    }
    return request;
  }
}
