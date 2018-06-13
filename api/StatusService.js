'use strict';

const dynamodb = require('serverless-dynamodb-client').doc;
// UserOfficeStatuses
//   UserId,OfficeId: Status

/**
 * A Status service.
 */
class StatusService {

  constructor(db = dynamodb) {
    this.db = db;
    this.TABLE_NAME = process.env.USER_OFFICE_STATUS_TABLE;
  }

  /**
   * Gets a Status by userId.
   *
   * @param userId the userId of the user.
   * @returns {Promise<*>}
   */
  async getStatusByUserId(userId) {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        userId: userId
      }
    };

    return this.db.get(params).promise();
  }

  /**
   *
   * @param userId
   * @param officeId
   * @param status
   * @returns {Promise<*>}
   */
  async updateStatus(userId, officeId, status) {
    const params = {
      TableName: this.TABLE_NAME,
      Item: {
        user_id: userId,
        office_id: officeId,
        status: status
      }
    };

    return this.db.update(params).promise();
  }
}

module.exports.UserOfficeStatus = StatusService;

