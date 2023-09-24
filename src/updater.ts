import fs from 'node:fs/promises';
import https from 'node:https';
import path from 'node:path';
import { IncomingMessage } from 'node:http';

export class Updater {
  public async fetch(): Promise<void> {
    const npmJsVer = await this.getVersion();
    const version = await this.getCurrentVersion();
    const result = this.compareSemVer(npmJsVer, version);
    if (result) {
      return console.log(
        `New update for nodestrap!\n`,
        `\bLatest Version: ${npmJsVer}\n`,
        `\bCurrent Version: ${version}\n`,
        `\bRun \`npm i -g @o-sca/nodestrap@latest\` to pull the latest updates.\n`
      );
    }
    return;
  }

  private async getCurrentVersion(): Promise<string> {
    const packageJson = await fs.readFile(
      path.join(__dirname, '..', 'package.json'),
      'utf8'
    );
    return (JSON.parse(packageJson) as { version: string }).version;
  }

  private async getVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      https.get(
        'https://registry.npmjs.org/@o-sca/nodestrap',
        (res: IncomingMessage) => {
          let body = '';

          res.on('data', (chunk) => {
            body += chunk;
          });

          res.on('end', () => {
            const jsonBody = JSON.parse(body) as {
              'dist-tags': { latest: string };
            };
            resolve(jsonBody['dist-tags'].latest);
          });
          res.on('error', (e) => {
            reject(e);
          });
        }
      );
    });
  }

  private compareSemVer(versionA: string, versionB: string): boolean {
    const versionsA = versionA.split(/\./g);
    const versionsB = versionB.split(/\./g);

    while (versionsA.length || versionsB.length) {
      const a = Number(versionsA.shift());
      const b = Number(versionsB.shift());

      if (a == b) continue;

      return a > b || isNaN(b);
    }
    return false;
  }
}
