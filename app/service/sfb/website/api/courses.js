'use strict';

const SfbWebsiteApiBase = require('./base');

/**
 * Source for the sfb events
 */
class SfbWebsiteApiCourses extends SfbWebsiteApiBase {

  /**
   * Constructor
   */
  constructor() {
    super();
    this.uri = 'gymnastik/api';
  }

}

module.exports = new SfbWebsiteApiCourses();