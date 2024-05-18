import path from 'node:path';
import { cwd } from 'node:process';

import { BaseHandler } from './handler.js';

const __fileURL = fileURLToPath(import.meta.url);
const __filePath = path.parse(__fileURL);
const __dirname = path.dirname(__filePath.dir);

export class TemplateHandler extends BaseHandler {
	public async handle(request: { [key: string]: string | boolean }) {
		if (request['template'] !== undefined) {
			const template = request['template'] as string;
			request['template'] = path.join(cwd(), 'templates', template);
			return await super.handle(request);
		}
		return request;
	}
}
