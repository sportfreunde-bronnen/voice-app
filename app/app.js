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
    /**
     * Existing user launches the skill
     *
     * @constructor
     */
    'LAUNCH': function() {
      this.tell('Herzlich willkommen bei den Sportfreunden Bronnen!')
    },

    /**
     * NEW user launches the skill
     *
     * @constructor
     */
    'NEW_USER': function() {
      this.tell('JA GRIASDE DU BAURASEGGL!');
    },

    /**
     * Global unhandled intent
     *
     * @constructor
     */
    'Unhandled': function() {
      this.tell('Das habe ich leider nicht verstanden.');
    },

    /**
     * Repeat
     *
     * @constructor
     */
    'AMAZON.RepeatIntent': function() {
      this.toIntent('RepeatIntent');
    },

    /**
     * Global repeat intent
     *
     * @constructor
     */
    'RepeatIntent': function() {
      this.repeat();
    }
  },

  require('./handler/NextEvents'),
  require('./handler/GetNews'),
  require('./handler/GetFootballResults'),
  require('./handler/GetContact'),
  require('./handler/ClubAnthem')

);

module.exports.app = app;
