const path = require('path');
const express = require('express');
const compression = require('compression');

const CONTEXT = `/${process.env.CONTEXT || 'angular'}`;
const PORT = process.env.PORT || 4000;

const app = express();
s
app.use(compression());
app.use(
  CONTEXT,
  express.static(
    path.resolve(__dirname, '../../dist/angular')
  )
);
app.use(
  '/',
  express.static(
    path.resolve(__dirname, '../../dist/angular')
  )
);
app.listen(PORT, () =>
  console.log(`App running on http://localhost:${PORT}${CONTEXT}`)
);
s