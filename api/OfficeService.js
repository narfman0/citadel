'use strict';

const dynamodb = require('serverless-dynamodb-client').doc;
// Office:
//   OfficeId
//   Slack Channel
//   Alexa Room Id

/**
 *
 */
class OfficeService {

  constructor(db = dynamodb) {
    this.db = db;
    this.TABLE_NAME = process.env.DYNAMODB_OFFICE_TABLE;
  }

  /**
   *
   * @param alexaRoomId
   * @returns {Promise<*>}
   */
  async getOfficeByAlexaRoomId(alexaRoomId) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        alexaRoomId: alexaRoomId
      }
    };

    return this.db.get(params).promise();
  }

  /**
   * Get office by Id.
   *
   * @param officeId the id of the office.
   * @returns {Promise<*>}
   */
  async getOfficeById(officeId) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        officeId: officeId
      }
    };

    return this.db.get(params).promise();
  }

  /**
   *
   * @param slackChannel
   * @returns {Promise<*>}
   */
  async getOfficeBySlackChannel(slackChannel) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        slackChannel: slackChannel
      }
    };
    return this.db.get(params).promise();
  }

}

module.exports.Offices = OfficeService;
