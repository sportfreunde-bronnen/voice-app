'use strict';

module.exports = {
  /**
   * Get contact information
   *
   * @constructor
   */
  'GetContact': function () {
    let speech = this.speechBuilder();

    speech
      .addText('Du erreichst uns am besten unter unserer E-Mailadresse info@sf-bronnen.de.')
      .addText('Mails an diese Adresse leiten wir direkt an den jeweiligen Ansprechpartner weiter.')
      .addBreak('250ms')
      .addText('Solltest Du auf Facebook aktiv sein kannst Du uns auch hier eine Nachricht schreiben. Wir antworten in der Regel innerhalb kürzester Zeit.')
      .addText('An Spieltagen erreichst Du uns ebenfalls telefonisch in unserem Vereinsheim. Die Nummer lautet')
      .addSayAsCharacters('07392')
      .addBreak('250ms')
      .addSayAsCharacters('928')
      .addBreak('150ms')
      .addSayAsCharacters('9899')
      .addBreak('250ms')
      .addText('Ich wiederhole:')
      .addSayAsCharacters('07392')
      .addBreak('250ms')
      .addSayAsCharacters('928')
      .addBreak('150ms')
      .addSayAsCharacters('9899');

    this.tell(speech);
  }
};