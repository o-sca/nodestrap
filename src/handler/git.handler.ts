import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { BaseHandler } from './handler.js';

export class GitHandler extends BaseHandler {
  public async handle(request: { [key: string]: boolean | string }) {
    if (request['git']) {
      const projectPath = request['project'] as string;
      const template = request['template'] as string;

      await this.createGitignore(projectPath, template);
      execSync(`git init`, { cwd: projectPath });
      return await super.handle(request);
    }
    return request;
  }

  private async createGitignore(projectPath: string, template: string) {
    const gitignoreFile = await fs.readFile(
      path.join(template, 'gitignore'),
      'utf-8'
    );
    await fs.writeFile(`${projectPath}/.gitignore`, gitignoreFile);
  }
}
