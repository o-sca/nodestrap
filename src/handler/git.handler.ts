import fs from 'node:fs';
import path from 'node:path';
import shell from 'shelljs';
import { BaseHandler } from './handler';

export class GitHandler extends BaseHandler {
  public handle(request: {
    [key: string]: boolean | string;
  }): { [key: string]: string | boolean } | null {
    if (request['git']) {
      const projectPath = request['project'] as string;
      shell.cd(projectPath);
      shell.exec('git init');
      this.createGitignore(projectPath);
      return super.handle(request);
    }
    return request;
  }

  private createGitignore(projectPath: string) {
    const gitignoreFile = fs.readFileSync(
      path.join(__dirname, '..', '..', 'templates', 'typescript', '.gitignore'),
      'utf-8'
    );
    fs.writeFileSync(`${projectPath}/.gitignore`, gitignoreFile);
  }
}
