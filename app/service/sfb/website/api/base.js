const rp = require('request-promise-native');

/**
 * Base class for all website based api data
 */
class SfbWebsiteApiBase {

  /**
   * Constructor
   */
  constructor() {
    this.url = 'https://sf-bronnen.de/';
    this.uri = '';
  }

  /**
   * Send request
   */
  async send() {
    let options = {
      uri: this.getUrl(),
      json: true
    };
    return new Promise((resolve, reject) => {
      rp(options)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUrl() {
    return this.url + this.uri;
  }
}

module.exports = SfbWebsiteApiBase;