import path from 'node:path';
import { BaseHandler } from './handler.js';

export class TemplateHandler extends BaseHandler {
  public async handle(request: { [key: string]: string | boolean }) {
    if (request['template'] !== undefined) {
      const template = request['template'] as string;
      request['template'] = path.join(__dirname, 'templates', template);
      return await super.handle(request);
    }
    return request;
  }
}
