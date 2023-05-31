#!/usr/bin/env node
import { Nodestrap } from './nodestrap.js';
import { Updater } from './updater.js';

const updater = new Updater();
const nodestrap = new Nodestrap();

(async () => {
  await updater.fetch();
  nodestrap.launch();
})();
