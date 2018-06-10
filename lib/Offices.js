'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

// Office:
//   OfficeId
//   Slack Channel
//   Alexa Room Id

/**
 *
 */
class Offices {

  constructor(db = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})) {
    this.db = db;
    this.TABLE_NAME = process.env.OFFICE_TABLE;
  }

  /**
   *
   * @param alexaRoomId
   * @returns {Promise<*>}
   */
  async getOfficeByAlexaRoomId(alexaRoomId) {
    // TODO fill in query params.
    const params = {
      TableName: this.TABLE_NAME
    };

    return this.db.query(params).promise();
  }

  /**
   *
   * @param slackChannel
   * @returns {Promise<*>}
   */
  async getOfficeBySlackChannel(slackChannel) {
    // TODO fill in query params
    const params = {
      TableName: this.TABLE_NAME
    };
    return this.db.query(params).promise();
  }

  /**
   *
   * @param alexaRoomId
   * @param slackChannel
   * @returns {Promise<*>}
   */
  async createOffice(alexaRoomId, slackChannel) {
    const params = {
      TableName: this.TABLE_NAME,
      Item: {
        alexaRoomId: alexaRoomId,
        id: uuid.v1(),
        slackChannel: slackChannel
      }
    };

    return this.db.update(params).promise();
  }
}

module.exports.Offices = Offices;
