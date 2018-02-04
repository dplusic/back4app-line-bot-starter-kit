import express from 'express';

const app = express();

global.app = app;

require('../src/app');

app.listen(3000);
