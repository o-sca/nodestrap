import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BaseHandler } from './handler.js';

const __fileURL = fileURLToPath(import.meta.url);
const __filePath = path.parse(__fileURL);
const __dirname = path.dirname(__filePath.dir);

export class TemplateHandler extends BaseHandler {
  public async handle(request: { [key: string]: string | boolean }) {
    if (request['template'] !== undefined) {
      const template = request['template'] as string;
      request['template'] = path.join(
        this.getPathUpToDir(__dirname, 'nodestrap'),
        'templates',
        template
      );

      return await super.handle(request);
    }
    return request;
  }

  private getPathUpToDir(filePath: string, dirName: string) {
    const parts = filePath.split(path.sep);
    const index = parts.indexOf(dirName);
    if (index !== -1) {
      return parts.slice(0, index + 1).join(path.sep);
    }
    return filePath;
  }
}
