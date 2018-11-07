'use strict';

const rp = require('request-promise-native');
const sprintf = require('sprintf').sprintf;

class SfbApiResults {

  /**
   * Get the latest results of the given team
   *
   * @param team
   */
  async getResults(team) {
    let options = {
      json: true,
      uri: sprintf('https://api.sf-bronnen.de/football/schedule/%s/alexa', team)
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

}

module.exports = new SfbApiResults();