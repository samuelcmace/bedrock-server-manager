'use strict';

const express = require('express');
const child_process = require('child_process');
const { join } = require('path');

var cp = child_process.spawn(join(__dirname, 'server/bedrock_server'), {
  cwd: join(__dirname, 'server'),
  env: {
    LD_LIBRARY_PATH: join(__dirname, 'server')
  }
});
cp.stdout.pipe(process.stdout);
cp.stderr.pipe(process.stdout);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
