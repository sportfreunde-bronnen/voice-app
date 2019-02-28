'use strict';

/**
 * Play the club anthem :)
 *
 * @type {{ClubAnthem: module.exports.ClubAnthem}}
 */
module.exports = {
  'ClubAnthem': function () {
    let speech = this.speechBuilder();
    speech
      .addText('Sie hören die Vereinshymne Blau und Weiß der Sportfreunde Bronnen.')
      .addBreak('250ms')
      .addText('Nach einer freien Interpretation der aktiven Spieler und einiger Gönner.')
      .addBreak('500ms')
      .addAudio('https://services.sf-bronnen.de/mp3/Blau-und-Weiss_Spieler.mp3');
    return this.tell(speech);
  }
};