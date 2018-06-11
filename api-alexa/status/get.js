'use strict';

const UserOfficeStatuses = require('../../lib/UserOfficeStatuses');
const Users = require('../../lib/Users');

const users = new Users();
const statuses = new UserOfficeStatuses();

module.exports.get = async (event) => {

  console.info(`get event: ${JSON.stringify(event, null, 2)}`);

  try {
    const user = await users.getUserByAlexaId(event.alexaUserId);
    const status = await statuses.getUserOfficeStatusByUserId(user.id);

    // TODO package status in a response for Alexa.
    return status;

  } catch (e) {
    console.error(`${JSON.stringify(e)}`);
  }
};
