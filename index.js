'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./src/Wizard/index.js');
} else {
    module.exports = require('./build/index');
}
