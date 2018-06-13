const dynamodb = require('serverless-dynamodb-client').doc;

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
class UserService {

  constructor(db = dynamodb) {
    this.db = db;
    this.TABLE_NAME = process.env.DYNAMODB_USER_TABLE;
  }

  /**
   * Gets User by AlexaId.
   *
   * @param alexaId
   * @returns {Promise<*>}
   */
  async getUserByAlexaId(alexaId) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        alexaId: alexaId
      }
    };

    return this.db.get(params).promise();
  }

  /**
   * Gets a User by SlackId.
   *
   * @param slackId the slackId of the user.
   * @returns {Promise<void>}
   */
  async getUserBySlackId(slackId) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        slackId: slackId
      }
    };

    return this.db.get(params).promise();
  }

  /**
   * Update a user's current office.
   *
   * @param userId the id of the user.
   * @param officeId the id of the new currentOffice.
   * @returns {Promise<*>}
   */
  async updateUserCurrentOffice(userId, officeId) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        userId: userId,
        currentOffice: officeId
      }
    };

    return this.db.update(params).promise();
  }

}

module.exports.Users = UserService;
