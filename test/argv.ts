import { expect } from "chai";
import { parseArgs } from "../src/cli";

describe('Argv Tests', () => {
  it('Passing process.argv into parseArgs will return the parsed arg results', () => {
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

  it('Not passing args will return an empty arg object', () => {
    process.argv = ['node', 'dist/src/index.js'];

    expect(parseArgs(process.argv)).to.deep.equal({
      _: []
    })
  });
});
