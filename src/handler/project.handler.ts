import path from 'node:path';
import chalk from 'chalk';
import { BaseHandler } from './handler';
import { Craft } from '../craft';

export class ProjectHandler extends BaseHandler {
  private readonly CURR_DIR = process.cwd();
  public handle(request: { [key: string]: string | boolean }) {
    if (request['project'] !== undefined) {
      const authorName = request['author'] as string;
      const templatePath = request['template'] as string;
      const projectName = request['project'] as string;
      const newProjectPath = path.join(this.CURR_DIR, projectName);

      request['project'] = newProjectPath;

      console.log(chalk.yellowBright(`Generating project...`));
      const createdProjectPath = Craft.project(newProjectPath);
      if (!createdProjectPath) throw new Error('Failed to create new project');
      Craft.dir(templatePath, projectName, authorName, this.CURR_DIR);

      return super.handle(request);
    }
    return request;
  }
}
