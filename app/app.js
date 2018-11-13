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
      this.tell('Servus und herzlich Willkommen bei den Sportfreunden Bronnen!');
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
     * Stop
     *
     * @constructor
     */
    'AMAZON.StopIntent': function() {
      this.toIntent('AMAZON.CancelIntent');
    },

    /**
     * Cancel "Abbrechen"
     *
     * @constructor
     */
    'AMAZON.CancelIntent': function() {
      this.tell('Alles klar, machs gut! Und immer schön sportlich bleiben.');
    },

    /**
     * Global repeat intent
     *
     * @constructor
     */
    'RepeatIntent': function() {
      this.repeat();
    },

    /**
     * Directly redirect this intent to the football news
     *
     * @constructor
     */
    'GetGameReports': function() {
      this.toIntent('GetNews', {id: 'fussball'});
    }
  },

  require('./handler/NextEvents'),
  require('./handler/GetNews'),
  require('./handler/GetFootballResults'),
  require('./handler/GetContact'),
  require('./handler/ClubAnthem'),
  require('./handler/GetCourseList')

);

module.exports.app = app;
