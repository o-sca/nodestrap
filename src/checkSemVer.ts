import { version } from "../package.json";
import https from "node:https";
import { IncomingMessage } from "node:http";

type NpmBody = {
  "dist-tags": {
    latest: string;
  };
}

/**
* Compare two semver versions. Returns true if version A is greater than
* version B
* @param {string} versionA
* @param {string} versionB
* @returns {boolean}
*/
function compareSemVer(versionA: string, versionB: string): boolean {
  const versionsA = versionA.split(/\./g);
  const versionsB = versionB.split(/\./g);

  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());
    const b = Number(versionsB.shift());

    if (a == b)
      continue;

    return (a > b || isNaN(b));
  }
  return false;
}


/**
 * Pull latest version value on npmjs.
 * @returns {Promise<string>} npmjs' latest version
 */
function pullNpmJsVersion(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get("https://registry.npmjs.org/@o-sca/nodestrap", (res: IncomingMessage) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        const jsonBody = (JSON.parse(body) as NpmBody);
        resolve(jsonBody["dist-tags"].latest)
      })
    }).on('error', (e) => {
      reject(e);
    });
  })
}

/**
 * Compares both version and prompts user to update if new version
 * is available.
 */
export function checkAndRun(): Promise<void> {
  return new Promise((resolve, reject) => {
    pullNpmJsVersion()
      .then((npmJsVer: string) => {
        if (compareSemVer(npmJsVer, version)) {
          console.log(`New update for nodestrap!\nLatest Version: ${npmJsVer}\nCurrent Version: ${version}\n`)
          console.log("Run `npm i -g @o-sca/nodestrap` to pull the latest updates.\n");
        }
        resolve();
      })
      .catch(reject)
  })
}

