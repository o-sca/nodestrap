import fs from "node:fs";
import path from "node:path";
import { Answers, ConfirmQuestion, InputQuestion, ListQuestion, ListQuestionOptions } from "inquirer";
import { Lang, Manager } from "../types";

const PKG_CHOICES = [Manager.npm, Manager.pnpm, Manager.yarn];
const ENV_CHOICES = fs.readdirSync(path.join(__dirname, '../..', 'templates')) as Lang[];


export const TEMPLATE_CHOICE: ListQuestion<Answers> =
{
  name: 'templateChoice',
  type: 'list',
  message: 'select project environment',
  choices: ENV_CHOICES,
  default: Lang.javascript
};

export const PROJECTNAME_CHOICE: InputQuestion<Answers> =
{
  name: 'projectName',
  type: 'input',
  message: 'input project name',
  validate: (input: string) => {
    //eslint-disable-next-line
    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
    else return 'Project name may only include letters, numbers, underscores and hashes.';
  }
};

export const AUTHORNAME_CHOICE: InputQuestion<Answers> =
{
  name: 'authorname',
  type: 'input',
  message: 'input author name'
};

export const GITINIT_CHOICE: ConfirmQuestion<Answers> =
{
  name: 'gitInit',
  type: 'confirm',
  message: 'initialise git?',
  default: false
};

export const PACKAGEMANAGER_CHOICE: ListQuestionOptions<Answers> =
{
  name: 'packageManager',
  type: 'list',
  message: 'select package manager',
  choices: PKG_CHOICES,
  default: Manager.npm
};

