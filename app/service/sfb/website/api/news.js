const SfbWebsiteApiBase = require('./base');

/**
 * Source for the sfb events
 */
class SfbWebsiteApiNews extends SfbWebsiteApiBase {

  /**
   * Constructor
   */
  constructor(department = 'gesamtverein') {
    super();
    this.department = department;
    this.uri = 'allgemeines/aktuelles/api';
  }

  /**
   * Switch to the given department
   *
   * @param department
   */
  switchDepartment(department) {
    this.department = department;
    return this;
  }

  /**
   * Return the current department
   *
   * @returns {*}
   */
  getDepartment() {
    return this.department;
  }

  /**
   * Return the url for the given department news
   *
   * @returns {string}
   */
  getUrl() {
    return this.url + this.department + '/' + this.uri;
  }
}

module.exports = new SfbWebsiteApiNews();