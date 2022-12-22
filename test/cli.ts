import { expect } from "chai";
import { parseArgs, initOptions, checkMissingPrompts } from "../src/cli";
import { AUTHORNAME_CHOICE, GITINIT_CHOICE, PACKAGEMANAGER_CHOICE, PROJECTNAME_CHOICE, TEMPLATE_CHOICE } from "../src/constants";
import { Lang, Manager, Options } from "../src/types";

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

describe('CLI Tests', () => {
  it('Not passing args will keep options.skipPrompt as false', () => {
    process.argv = ['node', 'dist/src/index.js'];

    const parsedArgs = parseArgs(process.argv);

    expect(initOptions(options, parsedArgs)).to.deep.equal({
      projectName: '',
      authorName: '',
      templateChoice: '',
      templatePath: '',
      targetPath: '',
      gitInit: false,
      packageManager: '',
      skipPrompt: false
    })
  });

  it('missing --git arg should have it included in the question list', () => {
    process.argv = [
      'node', 'dist/src/index.js',
      '-p', 'typescript',
      '-n', 'project-ts',
      '-a', 'gitman',
      '-i', 'pnpm',
    ];

    expect(options.projectName).to.be.deep.equal("");
    expect(options.authorName).to.be.deep.equal("");
    expect(options.templateChoice).to.be.deep.equal("");
    expect(options.templatePath).to.be.deep.equal("");
    expect(options.gitInit).to.be.deep.equal(false);
    expect(options.packageManager).to.be.deep.equal("");
    expect(options.skipPrompt).to.be.deep.equal(false);


    const parsedArgs = parseArgs(process.argv);
    const filledOptions = initOptions(options, parsedArgs);
    expect(checkMissingPrompts(filledOptions)).to.deep.equal([
      GITINIT_CHOICE
    ]);
  });

  it('missing --project arg should have it included in the question list', () => {
    process.argv = [
      'node', 'dist/src/index.js',
      '-n', 'test-js-project',
      '-a', 'mr. projects <hi@projects.com>',
      '-i', 'yarn',
      '-g'
    ];

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

    const parsedArgs = parseArgs(process.argv);
    const filledOptions = initOptions(options, parsedArgs);
    expect(checkMissingPrompts(filledOptions)).to.deep.equal([
      TEMPLATE_CHOICE
    ]);
  });

  it('missing --install arg will have it included in the question list', () => {
    process.argv = [
      'node', 'dist/src/index.js',
      '-p', 'js',
      '-n', 'test-js-project',
      '-a', 'install args',
      '-g'
    ];

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

    const parsedArgs = parseArgs(process.argv);
    const filledOptions = initOptions(options, parsedArgs);
    expect(checkMissingPrompts(filledOptions)).to.deep.equal([
      PACKAGEMANAGER_CHOICE,
    ]);
  });

  it('missing all args will have all included in the question list', () => {
    process.argv = [
      'node', 'dist/src/index.js',
    ];

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

    const parsedArgs = parseArgs(process.argv);
    const filledOptions = initOptions(options, parsedArgs);
    expect(checkMissingPrompts(filledOptions)).to.deep.equal([
      TEMPLATE_CHOICE,
      PROJECTNAME_CHOICE,
      AUTHORNAME_CHOICE,
      PACKAGEMANAGER_CHOICE,
      GITINIT_CHOICE
    ]);
  });
});
