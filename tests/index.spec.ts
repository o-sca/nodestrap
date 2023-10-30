import { describe, expect, test } from 'manten';
import { readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import {
  DependencyHandler,
  GitHandler,
  ProjectHandler,
  TemplateHandler,
} from '../src/handler/index.js';

type NodestrapProjectResponse = {
  template: string;
  project: string;
  author: string;
  git: boolean;
  packageManager: string;
};

const inquirerOptionsForTS = {
  template: 'typescript',
  project: 'ts-test',
  author: 'test',
  git: true,
  packageManager: 'npm',
};

describe('Nodestrap Test', async () => {
  const projectHandler = new ProjectHandler();
  const templateHandler = new TemplateHandler();
  const dependencyHandler = new DependencyHandler();
  const gitHandler = new GitHandler();

  templateHandler
    .setNext(projectHandler)
    .setNext(gitHandler)
    .setNext(dependencyHandler);

  const result = (await templateHandler.handle(
    inquirerOptionsForTS
  )) as NodestrapProjectResponse;

  const files = readdirSync(result.project);

  test('Correctly generated project', () => {
    expect(result).toStrictEqual({
      template: path.join(inquirerOptionsForTS.template),
      project: path.join(inquirerOptionsForTS.project),
      author: inquirerOptionsForTS.author,
      git: inquirerOptionsForTS.git,
      packageManager: inquirerOptionsForTS.packageManager,
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

  rmSync(result.project, { recursive: true, force: true });
});
