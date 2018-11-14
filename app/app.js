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
    'LAUNCH': function(speech) {

      if (speech === undefined) {
        speech = this.speechBuilder();
      }
      speech
        .addText('Hallo und herzlich Willkommen zurück bei den Sportfreunden Bronnen!')
        .addBreak('250ms')
        .addText('Es gibt viele Dinge über die Sportfreunde, die ich Dir erzählen kann. Für was interessierst Du Dich?')
        .addBreak('250ms')
        .addText('Wenn Du wissen willst, wie unsere Fußballer zuletzt gespielt haben, sage <prosody volume="x-loud">Ergebnisse</prosody>.')
        .addBreak('250ms')
        .addText('Um zu erfahren, was es im Verein Neues gibt, sage <prosody volume="x-loud">Neuigkeiten</prosody>.')
        .addBreak('250ms')
        .addText('Du magst wissen, wann bestimmte Veranstaltungen stattfinden? Dann sage einfach <prosody volume="x-loud">Veranstaltungen</prosody>.')
        .addBreak('250ms')
        .addText('Ich kann Dir auch sagen, welche Gymnastikkurse wir anbieten. Sage hierfür einfach <prosody volume="x-loud">Gymnastikkurse</prosody>.')
        .addBreak('250ms')
        .addText('Du kennst unsere Vereinshymne noch nicht? Dann sage <prosody volume="x-loud">Vereinshymne</prosody>.')
        .addBreak('250ms')
        .addText('Also. Was kann ich für Dich tun?');

      this.followUpState('EntryFeedback');
      this.ask(speech, 'Sage nun Ergebnisse, Berichte, Veranstaltungen, Gymnastikkurse oder Vereinshymne.');

    },

    /**
     * NEW user launches the skill
     *
     * @constructor
     */
    'NEW_USER': function() {
      let speech = this.speechBuilder();
      speech
        .addText('Hallo und herzlich Willkommen bei den Sportfreunden Bronnen!')
        .addBreak('250ms')
        .addText('Schön dass Du den Skill aktiviert hast und Dich für unseren Verein interessierst!')
        .addBreak('250ms');
      this.toIntent('LAUNCH', speech);
    },

    'EntryFeedback': {
      'Unhandled': function () {
        this.ask('Das konnte ich nicht verstehen. Sage nun Ergebnisse, Berichte, Veranstaltungen, Gymnastikkurse oder Vereinshymne.');
      },
      'EntryResults': function () {
        this.removeState();
        this.toIntent('GetFootballResults');
      },
      'EntryNews': function () {
        this.removeState();
        this.toIntent('GetNews', {id: 'gesamtverein'});
      },
      'EntryEvents': function () {
        this.removeState();
        this.toIntent('NextEvents');
      },
      'CourseDetail': function () {
        this.removeState();
        this.toIntent('GetCourseList');
      },
      'GetCourseList': function () {
        this.removeState();
        this.toIntent('GetCourseList');
      }
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
    },

    /**
     * Redirect to all events
     *
     * @constructor
     */
    'SpecificEvent': function() {
      this.toIntent('NextEvents');
    }
  },

  require('./handler/NextEvents'),
  require('./handler/GetNews'),
  require('./handler/GetFootballResults'),
  require('./handler/GetNextFootballGame'),
  require('./handler/GetContact'),
  require('./handler/ClubAnthem'),
  require('./handler/GetCourseList')

);

module.exports.app = app;