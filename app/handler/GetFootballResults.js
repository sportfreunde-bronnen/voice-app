'use strict';

const SfbApiResults = require('../service/sfb/api/results');

module.exports = {

  'GetFootballResults': async function () {

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
        if (results['latest'] !== undefined) {
          let latest = results['latest'];
          speech
            .addText('Das letzte Spiel')
            .addText('der ' + teamIdentifier + 'n Mannschaft am')
            .addText(latest['date'])
            .addText('um ' + latest['time'])
            .addText('in Bronnen', latest.home_game)
            .addText('gegen ' + latest.opponent, latest.home_game)
            .addText('beim ' + latest.opponent, !latest.home_game)
            .addText('wurde mit ' + latest.goals_sfb + ':' + latest.goals_opponent, !(latest.goals_sfb === latest.goals_opponent))
            .addText('endete ' + latest.goals_sfb + ':' + latest.goals_opponent + ' unentschieden!', (latest.goals_sfb === latest.goals_opponent))
            .addText('gewonnen!', (latest.goals_sfb > latest.goals_opponent))
            .addText('verloren!', (latest.goals_sfb < latest.goals_opponent));

          // Add the scorers
          if (latest.scorer !== undefined && latest.scorer.length > 0) {
            if (latest.scorer.length === 1) {
              speech.addText('Unser Torschütze war ' + latest.scorer[0].scorer_name);
            } else {
              speech.addText('Unsere Torschützen waren');
              latest.scorer.forEach((scorer, index) => {
                speech
                  .addText(scorer.scorer_name)
                  .addText('und', (index < latest.scorer.length - 1));
              });
            }
          }
          this.tell(speech);
        } else {
          this.tell('Aktuell habe ich leider keinen Zugriff auf die Daten der Spiele, sorry!');
        }
      })
      .catch((error) => {
        this.tell('Beim Abrufen der letzten Ergebnisse ist leider ein Fehler aufgetreten. Bitte entschuldige!');
      });
  }

};