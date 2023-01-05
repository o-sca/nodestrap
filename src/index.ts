#!/usr/bin/env node
import { Lang, Manager, Options } from "./types"
import { checkAndRun } from "./checkSemVer";
import { checkMissingPrompts, initOptions, parseArgs } from "./cli";
import nodestrap from "./nodestrap";

const options: Options = {
  projectName: "",
  authorName: "",
  templateChoice: Lang.default,
  templatePath: "",
  targetPath: "",
  gitInit: false,
  packageManager: Manager.default,
  skipPrompt: false
}

checkAndRun()
  .catch(console.error)
  .finally(() => {
    const parsedArgs = parseArgs(process.argv);
    const filledOptions = initOptions(options, parsedArgs);
    const questionsLeft = checkMissingPrompts(filledOptions);
    nodestrap(filledOptions, questionsLeft).catch(console.error);
  });
