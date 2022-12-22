import { expect } from "chai";
import { mkdirSync } from "node:fs";
import path from "node:path";
import shelljs from "shelljs";
import nodestrap from "../src/nodestrap";
import { parseArgs, initOptions, checkMissingPrompts } from "../src/cli";
import { Manager, Lang, Options } from "../src/types";

const options: Options = {
  projectName: "",
  authorName: "",
  templateChoice: Lang.default,
  templatePath: "",
  targetPath: "",
  gitInit: false,
  packageManager: Manager.default,
  skipPrompt: false
};

describe('Main Nodestrap Tests', () => {
  it('creating a new project to an existing path will return an error', () => {
    /* Create the folder. */
    mkdirSync(path.join(__dirname, "..", "this-path-will-fail"));

    process.argv = [
      'node', 'dist/src/index.js',
      '-p', 'js',
      '-n', 'this-path-will-fail',
      '-a', 'real dev',
      '-i', 'npm',
      '-g', 'false'
    ];


    const parsedArgs = parseArgs(process.argv);
    const filledOptions = initOptions(options, parsedArgs);
    const questionsLeft = checkMissingPrompts(filledOptions);
    nodestrap(filledOptions, questionsLeft)
      .then((result) => {
        expect(result).to.equal(false);
      })
      .catch(/* fail silently... */)
      .finally(() => {
        shelljs.cd(process.cwd());
        shelljs.exec(`rm -r this-path-will-fail`);
      })
  });

});
