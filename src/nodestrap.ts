import chalk from "chalk";
import path from "node:path";
import inquirer, { PromptModule, Question } from "inquirer";
import { NSAnswers, Options } from "./types";
import { installDeps, execGitInit, createProject, createDirContents } from "./functions";

const CURR_DIR = process.cwd();

/**
* Prints the success message.
* @param {Options} options
*/
function successLog(options: Options): boolean {
  const optionsCopy = {
    projectName: options.projectName,
    authorName: options.authorName,
    templateChoice: options.templateChoice,
    targetPath: options.targetPath,
    packageManager: options.packageManager,
    gitInit: options.gitInit
  };
  console.log(chalk.greenBright(`⚡Project successfully generated!\n`));
  console.dir(optionsCopy);
  return true;
}

function errorLog(error: string): boolean {
  console.error(chalk.redBright(error));
  return false;
}

/**
 * Main driver.
 */
async function nodestrap(options: Options, questions: Question<NSAnswers>[]): Promise<boolean> {
  const prompt: PromptModule = inquirer.createPromptModule();
  const answers = await prompt(questions);

  const templateChoice = answers["templateChoice"] || options.templateChoice;
  const projectName = answers["projectName"] || options.projectName;
  const authorName = answers["authorName"] || options.authorName;
  const templatePath = path.join(__dirname, '..', 'templates', templateChoice);
  const targetPath = path.join(CURR_DIR, projectName);
  const gitInit = answers["gitInit"] || options.gitInit;
  const packageManager = answers.packageManager || options.packageManager;

  const finalOptions: Options = {
    skipPrompt: options.skipPrompt,
    gitInit: gitInit,
    projectName: projectName,
    authorName: authorName,
    templateChoice: templateChoice,
    templatePath: templatePath,
    targetPath: targetPath,
    packageManager: packageManager
  };

  console.log(chalk.yellowBright(`Generating project...`));

  if (!createProject(targetPath)) return errorLog("Failed to create new project");
  createDirContents(templatePath, projectName, authorName, CURR_DIR);
  if (!installDeps(finalOptions)) return errorLog("Failed to install dependencies");
  if (!execGitInit(finalOptions)) return errorLog("Failed to execute `git init`");
  return successLog(finalOptions);
}

export default nodestrap;
