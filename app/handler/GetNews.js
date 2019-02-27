'use strict';

const news = require('../service/sfb/website/api/news');

module.exports = {

  /**
   * Return department specific news
   *
   * @constructor
   */
  'GetNews': function (department) {

    if (department.id !== undefined) {
      news.switchDepartment(department.id)
    }

    let speech = this.speechBuilder();
    let obj = this;

    news
      .send()
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          obj.setSessionAttribute('currentNewsIndex', 0);
          obj.setSessionAttribute('currentNewsData', data);
          speech
            .addText('Hier sind die letzten ' + data.length)
            .addText(department.id, department.id !== undefined)
            .addText('Meldungen.')
            .addBreak('500ms');
          this.toIntent('VReadNews', speech)
        } else {
          speech
            .addText('Aktuell gibt es noch keine aktuellen')
            .addText(department.id, department.id !== undefined)
            .addText('Meldungen. Versuche es gerne ein ander Mal wieder!');
          this.tell(speech);
        }
      })
      .catch((err) => {
        console.error(err);
        obj.tell('FEHLER!');
      });

  },

  /**
   * Read the current news based on the current news index
   *
   * @param speech
   * @constructor
   */
  'VReadNews': function (speech) {

    let currentNewsData = this.getSessionAttribute('currentNewsData');
    let currentNewsIndex = this.getSessionAttribute('currentNewsIndex');

    if (speech === undefined) {
      speech = this.speechBuilder();
    }

    if (currentNewsData[currentNewsIndex] === undefined) {
      speech.addText('Wir sind am Ende der Meldungen angelangt. Bis zum nächsten Mal!');
      this.tell(speech);
      return;
    }

    const currentNews = currentNewsData[currentNewsIndex];

    speech
      .addText('Artikel vom ')
      .addText(currentNews['date'] + ':')
      .addBreak('250ms')
      .addText(currentNews['title'] + '.')
      .addBreak('250ms')
      .addText('Soll ich Dir das vorlesen?');

    this.followUpState('ReadCurrentNewsQuestion');
    this.ask(speech, 'Sage ja, wenn ich Dir das vorlesen soll. Sage Nein, wenn nicht.');

  },

  'ReadCurrentNewsQuestion': {

    'AMAZON.HelpIntent': function () {
      this.ask('Du kannst nun Ja oder Nein sagen, ob ich Dir die Meldung vorlesen soll.', 'Sage ja oder nein');
    },

    /**
     * Read the current news
     *
     * @constructor
     */
    'AMAZON.YesIntent': function () {

      let currentNewsData = this.getSessionAttribute('currentNewsData');
      let currentNewsIndex = this.getSessionAttribute('currentNewsIndex');

      const currentNews = currentNewsData[currentNewsIndex];

      let speech = this.speechBuilder();

      speech
        .addText(currentNews['title'])
        .addBreak('250ms')
        .addText(currentNews['text'].replace(/&quot;/g, ''));

      speech
        .addBreak('500ms')
        .addText('Soll ich Dir nun die weiteren Meldungen durchgeben?');

      this.followUpState('ReadNextNews');
      this.ask(speech, 'Sage ja, wenn ich Dir die weiteren Meldungen durchgeben soll. Nein, wenn Du das nicht möchtest.');

    },

    /**
     * No = next news
     *
     * @constructor
     */
    'AMAZON.NoIntent': function () {
      this.toIntent('AMAZON.NextIntent');
    },

    /**
     * Read the next news title
     *
     * @constructor
     */
    'AMAZON.NextIntent': function () {
      let currentNewsIndex = this.getSessionAttribute('currentNewsIndex');
      this.setSessionAttribute('currentNewsIndex', ++currentNewsIndex);
      this.removeState();
      this.toIntent('VReadNews');
    }

  },

  'ReadNextNews': {

    'AMAZON.HelpIntent': function () {
      this.ask('Sage ja, wenn ich Dir die weiteren Meldungen durchgeben soll. Nein, wenn Du das nicht möchtest.', 'Sage nun Ja oder Nein.');
    },

    /**
     * Yes = read news
     *
     * @constructor
     */
    'AMAZON.YesIntent': function () {
      let currentNewsIndex = this.getSessionAttribute('currentNewsIndex');
      this.setSessionAttribute('currentNewsIndex', ++currentNewsIndex);
      this.removeState();
      this.toIntent('VReadNews');
    },

    /**
     * No = next news
     *
     * @constructor
     */
    'AMAZON.NoIntent': function () {
      this.removeState();
      this.toIntent('AMAZON.CancelIntent');
    }
  }

};