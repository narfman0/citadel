'use strict';

const AWS = require('aws-sdk');

// UserOfficeStatuses
//   UserId,OfficeId: Status

/**
 *
 */
class UserOfficeStatuses {

  constructor(db = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})) {
    this.db = db;
    this.TABLE_NAME = process.env.USER_OFFICE_STATUS_TABLE;
  }

  /**
   *
   * @param userId
   * @returns {Promise<*>}
   */
  async getUserOfficeStatusByUserId(userId) {
    // TODO implement getUserOfficeStatusByUserId
    const params = {
      TableName: this.TABLE_NAME
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
  async updateUserOfficeStatus(userId, officeId, status) {
    // TODO implement updateUserOfficeStatus
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

module.exports.UserOfficeStatus = UserOfficeStatuses;
