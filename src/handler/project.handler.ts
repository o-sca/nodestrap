import path from 'node:path';
import { BaseHandler } from './handler';
import { Craft } from '../craft';

export class ProjectHandler extends BaseHandler {
  private readonly CURR_DIR = process.cwd();
  public async handle(request: { [key: string]: string | boolean }) {
    if (request['project'] !== undefined) {
      const authorName = request['author'] as string;
      const templatePath = request['template'] as string;
      const projectName = request['project'] as string;
      const newProjectPath = path.join(this.CURR_DIR, projectName);

      request['project'] = newProjectPath;

      await Craft.project(newProjectPath);
      await Craft.dir(templatePath, projectName, authorName, this.CURR_DIR);

      return await super.handle(request);
    }
    return request;
  }
}
