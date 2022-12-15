import fs from "node:fs";
import path from "node:path";
import inquirer, { PromptModule } from "inquirer";
import { Manager, Answers, Options, Lang } from "./types";
import { postProcess, createProject, createDirContents } from "./functions";

const CURR_DIR = process.cwd();

const ENV_CHOICES = fs.readdirSync(path.join(__dirname, '..', 'templates')) as Lang[];
const PKG_CHOICES = [Manager.npm, Manager.pnpm, Manager.yarn];

const QUESTIONS = [
  {
    name: 'templateChoice',
    type: 'list',
    message: 'select project environment',
    choices: ENV_CHOICES
  },
  {
    name: 'projectName',
    type: 'input',
    message: 'input project name',
    validate: function(input: string) {
      //eslint-disable-next-line
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'authorName',
    type: 'input',
    message: 'input author name'
  },
  {
    name: 'packageManager',
    type: 'list',
    message: 'select package manager',
    choices: PKG_CHOICES
  }
];

const prompt: PromptModule = inquirer.createPromptModule();

function start(): void {
  prompt(QUESTIONS).then((answers: Answers) => {
    const templateChoice = answers["templateChoice"];
    const projectName = answers["projectName"];
    const authorName = answers["authorName"];
    const templatePath = path.join(__dirname, '..', 'templates', templateChoice);
    const targetPath = path.join(CURR_DIR, projectName);
    const packageManager = answers.packageManager;

    const options: Options = {
      projectName: projectName,
      authorName: authorName,
      templateChoice: templateChoice,
      templatePath: templatePath,
      targetPath: targetPath,
      packageManager: packageManager
    };

    console.log(options);

    if (!createProject(targetPath)) return;
    createDirContents(templatePath, projectName, authorName, CURR_DIR);
    postProcess(options)
  }).catch(console.error);
}

start();

