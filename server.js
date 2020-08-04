'use strict';

const express = require('express');
const child_process = require('child_process');
const { join } = require('path');

/**
 * Child Process
 */
var cp = null;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

let serverLog = [];

app.get('/status', (req, res) => {
  res.json({
    status: cp != null ? "on" : "off"
  });
});

app.get('/start', (req, res) => {
  if (cp) {
    res.json({running: true});
    return;
  }

  serverLog = [];

  cp = child_process.spawn(join(__dirname, 'server/bedrock_server'), {
    cwd: join(__dirname, 'server'),
    env: {
      LD_LIBRARY_PATH: join(__dirname, 'server')
    }
  });
  cp.stdout.on('data', (data) => {
    serverLog.push(data.toString());
  });
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stdout);

  cp.on('exit', () => {
    cp = null;
  })

  res.json({});
});

app.get('/log', (req, res) => {
  res.json(serverLog);
});

app.get('/list', (req, res) => {
  if (!cp) {
    res.json({notRunning: true});
    return;
  }
  cp.stdin.write("list\n");
  res.json({});
});

app.get('/shutdown', (req, res) => {
  if (!cp) {
    res.json({notRunning: true});
    return;
  }
  cp.stdin.write("stop\n");
  res.json({});
});

app.use(express.static(__dirname + "/dist"));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
