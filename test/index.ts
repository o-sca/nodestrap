import { expect } from "chai";
import { describe } from "node:test";
import { checkMissingPrompts, initOptions, parseArgs } from "../src/cli";
import { AUTHORNAME_CHOICE, GITINIT_CHOICE, PACKAGEMANAGER_CHOICE, PROJECTNAME_CHOICE, TEMPLATE_CHOICE } from "../src/constants";
import { Lang, Manager, Options } from "../src/types";

describe('Passing process.argv into parseArgs will return the parsed arg results', () => {
  process.argv = [
    'node', 'dist/src/index.js',
    '-p', 'ts',
    '-n', 'test-ts-project',
    '-a', 'oscar',
    '-i', 'npm',
    '-g'
  ];

  expect(parseArgs(process.argv)).to.deep.equal({
    _: [],
    '--project': 'ts',
    '--name': 'test-ts-project',
    '--author': 'oscar',
    '--git': true,
    '--install': 'npm'
  })
});

describe('Not passing args will return an empty arg object', () => {
  process.argv = ['node', 'dist/src/index.js'];

  expect(parseArgs(process.argv)).to.deep.equal({
    _: []
  })
});

describe('Not passing args will keep options.skipPrompt as false', () => {
  process.argv = ['node', 'dist/src/index.js'];

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

describe('initOptions should return the updated options object', () => {
  process.argv = [
    'node', 'dist/src/index.js',
    '-p', 'typescript',
    '-n', 'test-project',
    '-a', 'another one',
    '-i', 'pnpm',
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

  expect(initOptions(options, parsedArgs)).to.deep.equal({
    projectName: 'test-project',
    authorName: 'another one',
    templateChoice: 'typescript',
    templatePath: '',
    targetPath: '',
    gitInit: true,
    packageManager: 'pnpm',
    skipPrompt: true
  })
});

describe('missing --git arg should have it included in the question list', () => {
  process.argv = [
    'node', 'dist/src/index.js',
    '-p', 'javascript',
    '-n', 'test-js-project',
    '-a', 'newName',
    '-i', 'yarn',
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
    GITINIT_CHOICE
  ]);
});

describe('missing --project arg should have it included in the question list', () => {
  process.argv = [
    'node', 'dist/src/index.js',
    '-n', 'test-js-project',
    '-a', 'newName',
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
  console.log(filledOptions)
  expect(checkMissingPrompts(filledOptions)).to.deep.equal([
    TEMPLATE_CHOICE
  ]);
});

describe('missing --install arg will have it included in the question list', () => {
  process.argv = [
    'node', 'dist/src/index.js',
    '-p', 'js',
    '-n', 'test-js-project',
    '-a', 'newName',
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

describe('missing all args will have all included in the question list', () => {
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
