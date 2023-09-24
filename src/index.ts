#!/usr/bin/env node
import { Nodestrap } from './nodestrap';
import { Updater } from './updater';

const updater = new Updater();
const nodestrap = new Nodestrap();

(async () => {
  await updater.fetch();
  nodestrap.launch();
})();
