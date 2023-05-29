import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BaseHandler } from './handler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class TemplateHandler extends BaseHandler {
  public async handle(request: { [key: string]: string | boolean }) {
    if (request['template'] !== undefined) {
      const template = request['template'] as string;
      request['template'] = path.join(
        __dirname,
        '../..',
        'templates',
        template
      );
      return await super.handle(request);
    }
    return request;
  }
}
