import * as path from 'node:path';
import { BaseHandler } from './handler';

export class ProjectEnvironmentHandler extends BaseHandler {
  private readonly CURR_DIR = process.cwd();
  public handle(request: { [key: string]: string | boolean }) {
    if (request['project'] !== undefined) {
      const project = request['project'] as string;
      request['project'] = path.join(this.CURR_DIR, project);
      return request;
    }
    return super.handle(request);
  }
}
