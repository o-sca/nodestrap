#!/usr/bin/env node
import { Nodestrap } from './nodestrap.js';
import { Updater } from './updater.js';

const nodestrap = new Nodestrap();
const updater = new Updater();

(async () => {
	await updater.fetch();
	nodestrap.launch();
})();
