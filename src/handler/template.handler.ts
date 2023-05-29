import path from 'node:path';
import { BaseHandler } from './handler.js';

export class TemplateHandler extends BaseHandler {
  public handle(request: {
    [key: string]: string | boolean;
  }): { [key: string]: string | boolean } | null {
    if (request['template'] !== undefined) {
      const template = request['template'] as string;
      request['template'] = path.join(
        __dirname,
        '../..',
        'templates',
        template
      );
      return super.handle(request);
    }
    return request;
  }
}
