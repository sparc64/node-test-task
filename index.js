'use strict';

const server = require('./server');
const config = require('config');

const port = config.get('port');

server.listen(port, () => console.log(`Server listening on port ${port}`));
