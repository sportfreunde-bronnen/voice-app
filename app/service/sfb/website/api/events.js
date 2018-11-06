const SfbWebsiteApiBase = require('./base');

/**
 * Source for the sfb events
 */
class SfbWebsiteApiEvents extends SfbWebsiteApiBase {

  /**
   * Constructor
   */
  constructor() {
    super();
    this.uri = 'gesamtverein/veranstaltungen/api';
  }

}

module.exports = new SfbWebsiteApiEvents();