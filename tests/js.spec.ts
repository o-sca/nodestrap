import { readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import {
	DependencyHandler,
	GitHandler,
	ProjectHandler,
	TemplateHandler,
} from '../src/handler';

type NodestrapProjectResponse = {
	template: string;
	project: string;
	author: string;
	git: boolean;
	packageManager: string;
};

const inquirerOptions = {
	template: 'javascript',
	project: 'js-test',
	author: 'test',
	git: true,
	packageManager: 'npm',
};

let result: NodestrapProjectResponse;
let files: string[];

beforeAll(async () => {
	rmSync(path.join(cwd(), 'js-test'), { recursive: true, force: true });

	const projectHandler = new ProjectHandler();
	const templateHandler = new TemplateHandler();
	const dependencyHandler = new DependencyHandler();
	const gitHandler = new GitHandler();

	templateHandler
		.setNext(projectHandler)
		.setNext(gitHandler)
		.setNext(dependencyHandler);

	result = (await templateHandler.handle(
		inquirerOptions
	)) as NodestrapProjectResponse;

	files = readdirSync(result.project);
});

afterAll(() => {
	rmSync(result.project, { recursive: true, force: true });
});

describe('Javascript Project', () => {
	test('Correctly generated project', () => {
		expect(result).toStrictEqual({
			template: path.join(inquirerOptions.template),
			project: path.join(inquirerOptions.project),
			author: inquirerOptions.author,
			packageManager: inquirerOptions.packageManager,
			git: inquirerOptions.git,
		});
	});

	test('Contains gitignore file', () => {
		expect(files).toContain('.gitignore');
	});

	test('Contains .git folder', () => {
		expect(files).toContain('.git');
	});

	test('Contains node_modules folder', () => {
		expect(files).toContain('node_modules');
	});
});
