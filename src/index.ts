#!/usr/bin/env node
// import { Nodestrap } from './nodestrap';
//
// const nodestrap = new Nodestrap();
// nodestrap.launch();

import ora from 'ora';
import cliSpinners from 'cli-spinners';

ora({
  suffixText: 'Loading',
  spinner: cliSpinners.dots,
}).start();
