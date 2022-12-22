//describe('create ts project', () => {
//  process.argv = [
//    'node', 'dist/src/index.js',
//    '-p', 'js',
//    '-n', 'js-test-project',
//    '-a', 'real dev',
//    '-i', 'npm',
//    '-g', 'false'
//  ];
//
//  const options: Options = {
//    projectName: "",
//    authorName: "",
//    templateChoice: Lang.default,
//    templatePath: "",
//    targetPath: "",
//    gitInit: false,
//    packageManager: Manager.default,
//    skipPrompt: false
//  };
//
//  const checkTargetPath = (): boolean => {
//    const exist = fs.existsSync(filledOptions.targetPath);
//    if (exist) {
//      console.log("Deleting test project")
//      shelljs.cd(process.cwd());
//      shelljs.exec(`rm -r ${filledOptions.projectName}`);
//      return true;
//    } else {
//      return false;
//    }
//  };
//
//  const parsedArgs = parseArgs(process.argv);
//  const filledOptions = initOptions(options, parsedArgs);
//  const questionsLeft = checkMissingPrompts(filledOptions)
//
//  nodestrap(filledOptions, questionsLeft).then((result) => {
//    if (result) {
//      expect(checkTargetPath()).to.equal(true);
//    } else {
//      console.error('Failed to generate project')
//    }
//  }).catch(console.error)
//});
