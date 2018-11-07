'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler(
  {
    'LAUNCH': function() {
        this.tell('Herzlich willkommen bei den Sportfreunden Bronnen!')
    }
  },

  require('./handler/NextEvents'),
  require('./handler/GetNews'),
  require('./handler/GetFootballResults')

);

module.exports.app = app;
