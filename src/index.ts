#!/usr/bin/env node
import { Nodestrap } from './nodestrap';
import { Updater } from './updater';

const nodestrap = new Nodestrap();
const updater = new Updater();

(async () => {
	await updater.fetch();
	nodestrap.launch();
})();
