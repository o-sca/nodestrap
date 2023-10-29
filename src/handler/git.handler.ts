import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import shell from 'shelljs';
import { BaseHandler } from './handler.js';

export class GitHandler extends BaseHandler {
  public async handle(request: { [key: string]: boolean | string }) {
    if (request['_git']) {
      const projectPath = request['project'] as string;
      shell.cd(projectPath);
      shell.exec('git init');
      await this.createGitignore(projectPath);
      return await super.handle(request);
    }
    return request;
  }

  private async createGitignore(projectPath: string) {
    const gitignoreFile = await fs.readFile(
      path.join(cwd(), 'templates', 'typescript', '.gitignore'),
      'utf-8'
    );
    await fs.writeFile(`${projectPath}/.gitignore`, gitignoreFile);
  }
}
