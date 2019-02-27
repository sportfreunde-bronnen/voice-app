'use strict';

const SfbApiResults = require('../service/sfb/api/results');

let self = module.exports = {

  'GetFootballResults': async function () {

    let speech = this.speechBuilder();

    let team = this.getInput('TEAM');
    let teamIdentifier = '';

    if (team.id === undefined) {
      teamIdentifier = 'erste';
    } else {
      teamIdentifier = team.id;
    }

    let obj = this;

    if (team.id === undefined) {
      self.AddResultToSpeech('erste', speech)
        .then((speechResult) => {
          self.AddResultToSpeech('zweite', speechResult)
            .then((finalSpeech) => {
              obj.tell(finalSpeech);
            });
        })
        .catch((error) => {
          obj.tell(error);
        });
    } else {
      self.AddResultToSpeech(teamIdentifier, speech)
        .then((finalSpeech) => {
          obj.tell(finalSpeech);
        })
        .catch((err) => {
          obj.tell(err);
        });
    }

  },

  'AddResultToSpeech': function (teamIdentifier, speech) {
    return new Promise((resolve, reject) => {
      SfbApiResults.getResults(teamIdentifier)
        .then((results) => {
          if (results['latest'] !== undefined) {
            let latest = results['latest'];

            if (latest.goals_opponent === undefined && latest.goals_sfb === undefined) {

              speech
                .addText('Zum letzten Spiel')
                .addText('der ' + teamIdentifier + 'n Mannschaft am')
                .addText(latest['date'])
                .addText('um ' + latest['time'])
                .addText('in Bronnen', latest.home_game)
                .addText('gegen ' + latest.opponent, latest.home_game)
                .addText('beim ' + latest.opponent, !latest.home_game)
                .addText('liegt mir leider noch kein Ergebnis vor. Versuche es später nochmal!');

            } else {

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
                  let isLastScorer = false;
                  latest.scorer.forEach((scorer, index) => {
                    isLastScorer = (index === latest.scorer.length - 1);
                    console.log(isLastScorer, scorer);
                    speech
                      .addText(scorer.scorer_name + ',', !isLastScorer)
                      .addText('und ' + scorer.scorer_name + '.', isLastScorer);
                  });
                }
              }

            }

            speech.addBreak('250ms');
            resolve(speech);
          }
        })
        .catch((error) => {
          console.error(error);
          this.reject(error);
        });
    });
  }
};