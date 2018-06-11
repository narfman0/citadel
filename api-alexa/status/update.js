'use strict';

const Offices = require('../../lib/Offices');
const UserOfficeStatuses = require('../../lib/UserOfficeStatuses');
const Users = require('../../lib/Users');

const offices = new Offices();
const statuses = new UserOfficeStatuses();
const users = new Users();

module.exports.update = async (event) => {

  console.info(`update event: ${JSON.stringify(event, null, 2)}`);

  try {
    const user = await users.getUserByAlexaId(event.alexaUserId);
    const office = await offices.getOfficeByAlexaRoomId(event.alexaRoomId);
    // TODO package response for Slack.
    return statuses.updateUserOfficeStatus(user.id, office.id, event.status);

  } catch (e) {
    console.error(`${JSON.stringify(e)}`);
  }
};
