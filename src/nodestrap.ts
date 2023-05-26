import { select, confirm, input } from '@inquirer/prompts';
import {
  DependencyHandler,
  GitHandler,
  ProjectHandler,
  TemplateHandler,
} from './handler';

export class Nodestrap {
  async launch() {
    const options = await this.prompt();

    const projectHandler = new ProjectHandler();
    const templateHandler = new TemplateHandler();
    const dependencyHandler = new DependencyHandler();
    const gitHandler = new GitHandler();

    templateHandler
      .setNext(projectHandler)
      .setNext(dependencyHandler)
      .setNext(gitHandler);

    const result = templateHandler.handle(options);
    console.log(result);
  }

  private async prompt() {
    const options = {
      template: await select<string>({
        message: 'select project environment',
        choices: [
          {
            name: 'typescript',
            value: 'typescript',
          },
          {
            name: 'javascript',
            value: 'javascript',
          },
        ],
      }),
      project: await input({
        message: 'input project name',
        validate: (input: string) => {
          //eslint-disable-next-line
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else
            return 'project name may only include letters, numbers, underscores and hashes.';
        },
      }),
      author: await input({
        message: 'input author name',
      }),
      git: await confirm({ message: 'initialise git?' }),
      packageManager: await select<string>({
        message: 'select package manager',
        choices: [
          {
            name: 'npm',
            value: 'npm',
          },
          {
            name: 'pnpm',
            value: 'pnpm',
          },
          {
            name: 'yarn',
            value: 'yarn',
          },
        ],
      }),
    };
    return options;
  }
}
