#!/usr/bin/env node
import { Nodestrap } from './nodestrap.js';

const nodestrap = new Nodestrap();

(async () => {
  nodestrap.launch();
})();
