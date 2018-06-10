'use strict';

const db = require('../../lib/Users');
const response = ('../../lib/response');

module.exports.get = async (event, context) => {

  try {
    const params = {
      TableName: process.env.TableName,
      Key: {
        id: event.pathParameters.id
      }
    };

    // TODO implement get method.
    let data = await db.get(params);

    return response.success(data);

  } catch (e) {
    console.error(`${JSON.stringify(e)}`)
  }
};
