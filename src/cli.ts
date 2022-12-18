import arg, { Handler, Result } from "arg";
import { Lang, Manager, Options } from "./types";
import {
  TEMPLATE_CHOICE,
  AUTHORNAME_CHOICE,
  PROJECTNAME_CHOICE,
  GITINIT_CHOICE,
  PACKAGEMANAGER_CHOICE
} from "./constants";
import { Question } from "inquirer";

type ParsedArgs = {
  '--project': Handler<string>,
  '--name': Handler<string>,
  '--author': Handler<string>,
  '--git': Handler<boolean>,
  '--install': Handler<string>,

  /* Aliases */
  '-p': '--project',
  '-n': '--name',
  '-a': '--author',
  '-g': '--git',
  '-i': '--install'
}

/**
* Prases the process.argv into an `arg` object.
* @param {string[]} argv
* @returns {Result<ParsedArgs}
*/
export function parseArgs(argv: string[]): Result<ParsedArgs> {
  const args = arg({
    '--project': String,
    '--name': String,
    '--author': String,
    '--git': Boolean,
    '--install': String,

    /* Aliases */
    '-p': '--project',
    '-n': '--name',
    '-a': '--author',
    '-g': '--git',
    '-i': '--install'
  }, {
    argv: argv.slice(2)
  });
  return args;
}

/**
* Fill the options object with the given args to its respective
* key value pair and returns the updated options object.
* @param {Options} options
* @param {Result<ParsedArgs} args
* @returns {Options}
*/
export function initOptions(options: Options, args: Result<ParsedArgs>): Options {
  if (
    args["--author"]
    || args["--git"]
    || args["--install"]
    || args["--name"]
    || args["--project"]
  ) options.skipPrompt = true;

  const projectTypes = ["ts", "js", "typescript", "javascript"];
  if (args["--project"] && projectTypes.includes(args["--project"].toLowerCase())) {
    switch (args["--project"].toLowerCase()) {
      case "ts":
      case "typescript":
        options.templateChoice = Lang.typescript;
        break;
      case "js":
      case "javascript":
        options.templateChoice = Lang.javascript;
        break;
      default:
        options.templateChoice = Lang.default;
        break;
    }
  }

  if (args["--name"]) {
    options.projectName = args["--name"];
  }

  if (args["--author"]) {
    options.authorName = args["--author"];
  }

  if (args["--git"]) {
    options.gitInit = args["--git"]
  } else options.gitInit = false;

  if (args["--install"] && args["--install"].toLowerCase()) {
    switch (args["--install"].toLowerCase()) {
      case "npm":
        options.packageManager = Manager.npm;
        break;
      case "pnpm":
        options.packageManager = Manager.pnpm;
        break;
      case "yarn":
        options.packageManager = Manager.yarn;
        break;
      default:
        options.packageManager = Manager.default;
        break;
    }
  }
  return options;
}

/**
 * Checks for any missing option key without a value.
 * @params {Options} options
 * @returns {Question[]}
 */
export function checkMissingPrompts(options: Options): Question[] {
  const questions: Question[] = [];
  if (!options.skipPrompt) {
    questions.push(
      TEMPLATE_CHOICE,
      PROJECTNAME_CHOICE,
      AUTHORNAME_CHOICE,
      PACKAGEMANAGER_CHOICE,
      GITINIT_CHOICE
    );
    return questions;
  }

  if (options.templateChoice === Lang.default) {
    questions.push(TEMPLATE_CHOICE);
  }

  if (!options.projectName) {
    questions.push(PROJECTNAME_CHOICE);
  }

  if (!options.authorName) {
    questions.push(AUTHORNAME_CHOICE);
  }

  if (options.packageManager === Manager.default) {
    questions.push(PACKAGEMANAGER_CHOICE);
  }

  if (!options.gitInit) {
    questions.push(GITINIT_CHOICE);
  }

  return questions;
}

