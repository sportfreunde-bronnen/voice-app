'use strict';

/**
 *
 * @type {{AnnualMeeting: (function(): (GoogleActionResponse|void|AlexaResponse))}}
 */
module.exports = {
  'AnnualMeetingIntent': function () {
    let speech = this.speechBuilder();
    speech
      .addAudio('soundbank://soundlibrary/human/amzn_sfx_human_walking_03')
      .addBreak('500ms')
      .addAudio('soundbank://soundlibrary/human/amzn_sfx_walking_on_grass_02')
      .addBreak('100ms')
      .addAudio('https://services.sf-bronnen.de/mp3/mikro-tap.mp3')
      .addBreak('250ms')
      .addText('Werte Damen und Herren - liebe Sportfreunde.')
      .addBreak('500ms')
      .addText('Ich darf euch hiermit alle recht herzlich zur siebzigsten Jahreshauptversammlung der Sportfreunde Bronnen begrüßen!')
      .addBreak('500ms')
      .addText('Ein besonderer Gruß gilt unserem Bürgermeister Kai Fehneberg.')
      .addBreak('750ms')
      .addText('Besonders begrüßen möchte ich außerdem unseren Ortsvorsteher und Ehrenmitglied Andreas Lebherz, sowie die Vertretung der Presse.')
      .addBreak('750ms')
      .addText('Ein weiterer Gruß gilt unserem Ehrenvorstand Adolf Schick.')
      .addBreak('750ms')
      .addText('Ebenso geht ein freundlicher Gruß an die anwesenden Vorsitzenden und Vertreter unserer befreundeten Vereine - besonders Tobias Mangold und seine Vorstands Kollegen unseres Fördervereins.')
      .addBreak('1000ms')
      .addText('Ich freue mich sehr, Sie alle heute Abend hier begrüßen zu dürfen. Es macht mich sehr stolz, im siebzigsten Jubiläumsjahr unseres Sportvereins die Einleitung dieser Versammlung zu übernehmen und euch alle kennenlernen zu dürfen.')
      .addBreak('750ms')
      .addText('Nun möchte ich das Wort allerdings an unseren Vorstand Ben Baur abgeben, der euch durch den heutigen Abend führen wird.')
      .addBreak('250ms')
      .addText('Aber sicher hören wir uns später noch einmal!')
      .addBreak('250ms')
      .addText('Viel Spaß: und immer schön sportlich bleiben.');

    this.tell(speech);
  }
};