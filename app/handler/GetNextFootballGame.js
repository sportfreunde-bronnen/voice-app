'use strict';

const SfbApiResults = require('../service/sfb/api/results');

module.exports = {

  /**
   * Get the next game of the team
   *
   * @constructor
   */
  'GetNextFootballGame': async function () {

    let speech = this.speechBuilder();

    let team = this.getInput('TEAM');
    let teamIdentifier = '';

    if (team === undefined) {
      teamIdentifier = 'erste';
    } else {
      if (team.id === undefined) {
        teamIdentifier = 'erste';
      } else {
        teamIdentifier = team.id;
      }
    }

    SfbApiResults.getResults(teamIdentifier)
      .then((results) => {

        if (results['next'] !== undefined) {
          let next = results['next'];
          speech
            .addText('Das nächste Spiel')
            .addText('der ' + teamIdentifier + 'n Mannschaft ist am')
            .addText(next['date'])
            .addText('um ' + next['time'])
            .addText('in Bronnen', next.home_game)
            .addText('auswärts', !next.home_game)
            .addText('gegen ' + next.opponent + '.');

          if (team.id === undefined) {
            SfbApiResults.getResults('zweite')
              .then((secondResults) => {
                if (secondResults['next'] !== undefined) {
                  let next = secondResults['next'];
                  speech
                    .addBreak('500ms')
                    .addText('Das nächste Spiel')
                    .addText('der Zweiten Mannschaft ist am')
                    .addText(next['date'])
                    .addText('um ' + next['time'])
                    .addText('in Bronnen', next.home_game)
                    .addText('auswärts', !next.home_game)
                    .addText('gegen ' + next.opponent + '.');

                  this.tell(speech);
                }
              })
              .catch((err) => {
                throw err;
              });
          } else {
            this.tell(speech);
          }

        } else {
          this.tell('Aktuell habe ich leider keinen Zugriff auf die Daten der Spiele, sorry!');
        }
      })
      .catch((error) => {
        console.error(error);
        this.tell('Beim Abrufen der letzten Ergebnisse ist leider ein Fehler aufgetreten. Bitte entschuldige!');
      });

  }

};