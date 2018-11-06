'use strict';

const sfbEvents = require('../service/sfb/website/api/events');

module.exports = {

  /**
   * List the upcoming events
   *
   * @constructor
   */
  'NextEvents': async function () {

    // Get the next dates
    sfbEvents.send()
      .then((events) => {

        events.sort((a, b) => {
          return new Date(a.dateStart) - new Date(b.dateStart);
        });

        let speech = this.speechBuilder();

        if (events.length > 0) {
          speech.addText('Die kommenden Termine der Sportfreunde lauten wir folgt:');

          events.forEach((event) => {
            speech
              .addText(event.title)
              .addText('am ' + event.dateStart + '.')
              .addBreak('300ms');

          });

        } else {
          speech.addText('Aktuell sind keine weiteren Termine der Sportfreunde bekannt!');
        }

        this.tell(speech);

      })
      .catch((err) => {
        this.tell('Beim Abrufen der nächsten Termine ist ein Fehler aufgetreten. Bitte versuche es später wieder.');
      });

  }

};