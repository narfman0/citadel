const AWS = require('aws-sdk');
const uuid = require('uuid/v1');

// Data Model

// User:
//   UserId
//   SlackId
//   AlexaId
//   Default Office
//   Current Office

/**
 * A service for User DB Items.
 */
class Users {

  constructor(db = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})) {
    this.db = db;
    this.TABLE_NAME = process.env.USER_TABLE;
  }

  async createUser(alexaId, slackId, defaultOffice) {
    const params = {
      TableName: this.TABLE_NAME,
      Item: {
        id: uuid(),
        alexa_id: alexaId,
        slack_id: slackId,
        default_office: defaultOffice
      }
    };

    return this.db.create(params).promise();
  }

  /**
   * Gets a User by SlackId.
   *
   * @param slackId the slackId of the user.
   * @returns {Promise<void>}
   */
  async getUserBySlackId(slackId) {
    // TODO implement getUserBySlackId.
    const params = {
      TableName: this.TABLE_NAME
    };

    this.db.get(params).promise();
  }

  /**
   * Gets User by AlexaId.
   *
   * @param alexaId
   * @returns {Promise<*>}
   */
  async getUserByAlexaId(alexaId) {
    // TODO implement getUserByAlexaId.
    const params = {};
    return this.db.get(params).promise();
  }

  /**
   *
   * @param userId
   * @param currentOffice
   * @returns {Promise<*>}
   */
  async updateUserCurrentOffice(userId, currentOffice) {
    // TODO implement updateUserCurrentOffice.
    const params = {
      TableName: this.TABLE_NAME
    };

    return this.db.update(params).promise();
  }
}

module.exports.Users = Users;
