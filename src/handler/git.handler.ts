import fs from 'node:fs/promises';
import path from 'node:path';
import shell from 'shelljs';
import { BaseHandler } from './handler';

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
      path.join(__dirname, 'templates', 'typescript', '.gitignore'),
      'utf-8'
    );
    await fs.writeFile(`${projectPath}/.gitignore`, gitignoreFile);
  }
}
