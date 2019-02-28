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

      this.setSessionAttribute('inAppHelpRequest', true);

      this.ask(speech, 'Sage nun Ergebnisse, Berichte, Veranstaltungen, Gymnastikkurse oder Vereinshymne.');

    },

    /**
     * NEW user launches the skill
     *
     * @constructor
     */
    'NEW_USER': function () {
      let speech = this.speechBuilder();
      speech
        .addText('Hallo und herzlich Willkommen bei den Sportfreunden Bronnen!')
        .addBreak('250ms')
        .addText('Schön dass Du den Skill aktiviert hast und Dich für unseren Verein interessierst!')
        .addBreak('250ms');
      this.toIntent('LAUNCH', speech);
    },

    /**
     * Help intent
     *
     * @constructor
     */
    'AMAZON.HelpIntent': function () {
      let speech = this.speechBuilder();
      // Check if the help was requested from inside the skill
      if (this.getSessionAttribute('inAppHelpRequest') === true) {
        speech
          .addText('Du kannst nun auswählen, welche Funktion des Skills Du nutzen möchtest.')
          .addText('Sage Ergebnisse für die letzten Ergebnisse.')
          .addText('Sage Neuigkeiten für die letzten Vereinsmeldungen.')
          .addText('Sage Veranstaltungen, um die kommenden Termine zu erfahren.')
          .addText('Sage Gymnastikkurse, um Dich über unser Kursangebot zu informieren.')
          .addText('Sage Vereinshymne, um unser Vereinslied zu hören.')
          .addBreak('250ms')
          .addText('Also, wie kann ich Dir helfen?');
        this.ask(speech, 'Sage nun Ergebnisse, Berichte, Veranstaltungen, Gymnastikkurse oder Vereinshymne.')
      } else {
        speech
          .addText('Um unseren Skill zu nutzen sage einfach: Alexa, starte Sportfreunde Bronnen.')
          .addText('Im Anschluss hilft Dir der Skill, Dich zurecht zu finden.')
          .addBreak('250ms')
          .addText('Du kannst die einzelnen Funktionen allerdings auch direkt aufrufen.')
          .addText('Wenn Du Dich für die Ergebnisse der Fußballer interessierst sage zum Beispiel: "Alexa, frage Sportfreunde Bronnen wie die Fussballer gespielt haben".')
          .addText('Für Neuigkeiten aus dem Gesamtverein sage: "Alexa, frage Sportfreunde Bronnen was es Neues gibt.')
          .addText('Für abteilungsspezifische Neuigkeiten sage zum Beispiel: "Alexa, frage Sportfreunde Bronnen was es beim Fussball Neues gibt.')
          .addText('Du kannst mich auch nach den kommenden Veranstaltungen befragen. Sage hierfür einfach: "Alexa, frage Sportfreunde Bronnen nach den kommenden Veranstaltungen".')
          .addText('Falls Du Dich für unsere Gymnastikabteilung interessierst, kannst Du sagen: "Alexa, frage Sportfreunde Bronnen welche Gymnastikkurse es gibt".')
          .addText('Solltest Du musikalisch angehaucht sein, kannst Du Dir auch unsere Vereinshymne anhören. Sage hierzu einfach: "Alexa, starte Sportfreunde Bronnen und spiele die Vereinshymne".')
          .addText('Wenn Du wissen willst wann die Fussballer wieder spielen sage einfach: "Alexa, frage Sportfreunde Bronnen nach den nächsten Spielen".')
          .addText('Du möchtest Kontakt mit uns aufnehmen? Dann hilft Dir der Skill so: "Alexa, frage Sportfreunde Bronnen, wie ich euch erreichen kann".')
          .addText('Um den Skill zu beenden kannst Du jederzeit sagen: "Alexa, abbrechen."')
          .addBreak('500ms')
          .addText('Also, wie kann ich Dir helfen?');
        this.ask(speech, 'Sage mir nun, wie ich Dir weiterhelfen kann.');
      }
    },

    'CourseDetail': function () {
      this.toIntent('GetCourseList');
    },

    /**
     * Global unhandled intent
     *
     * @constructor
     */
    'Unhandled': function () {
      this.tell('Das habe ich leider nicht verstanden.');
    },

    /**
     * Repeat
     *
     * @constructor
     */
    'AMAZON.RepeatIntent': function () {
      this.toIntent('RepeatIntent');
    },

    /**
     * Stop
     *
     * @constructor
     */
    'AMAZON.StopIntent': function () {
      this.toIntent('AMAZON.CancelIntent');
    },

    /**
     * Cancel "Abbrechen"
     *
     * @constructor
     */
    'AMAZON.CancelIntent': function () {
      this.tell('Alles klar, machs gut! Und immer schön sportlich bleiben.');
    },

    /**
     * Global repeat intent
     *
     * @constructor
     */
    'RepeatIntent': function () {
      this.repeat();
    },

    /**
     * Directly redirect this intent to the football news
     *
     * @constructor
     */
    'GetGameReports': function () {
      this.toIntent('GetNews', {id: 'fussball'});
    },

    /**
     * Redirect to all events
     *
     * @constructor
     */
    'SpecificEvent': function () {
      this.toIntent('NextEvents');
    }
  },

  require('./handler/NextEvents'),
  require('./handler/GetNews'),
  require('./handler/GetFootballResults'),
  require('./handler/GetNextFootballGame'),
  require('./handler/GetContact'),
  require('./handler/ClubAnthem'),
  require('./handler/GetCourseList'),
  require('./handler/AnnualMeeting')

);

module.exports.app = app;