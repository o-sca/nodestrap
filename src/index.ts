#!/usr/bin/env node
import { Nodestrap } from './nodestrap.js';

const nodestrap = new Nodestrap();

(async () => {
	await updater.fetch();
	nodestrap.launch();
})();
