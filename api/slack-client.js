const axios = require('axios');
const OfficeService = require('./OfficeService');
const UserService = require('./UserService');

const officeStatus = new OfficeService();
const userService = new UserService();

axios.defaults.baseURL = process.env.SLACK_API_ENDPOINT;
axios.defaults.params = {};

/**
 * Announce a users status to the office channel.
 *
 * @param status a user status.
 * @returns {Promise<void>}
 */
module.exports.announceStatus = async (status) => {
  try {
    const user = await userService.getUserById(status.userId);
    const office = await officeStatus.getOfficeById(status.officeId);
    const slackId = user.slackId;
    const slackChannel = office.slackChannel;

    const message = `@${user.slackId} is working from ${office.name}`;
    console.log(`announceStatus: ${slackId}, ${slackChannel}`);
    // FIXME
    return axios.post('chat.postMessage/', {
      channel: office.slackChannel,
      text: message,
      link_names: true,
      username: process.env.CITADEL_SLACK_USER_NAME
    });

  } catch (e) {
    console.error(`${JSON.stringify(e)}`);
  }
};

/**
 * Sets slack status from user status, and announces it to that offices's channel.
 *
 * @param status a user status.
 * @returns {Promise<void>}
 */
module.exports.setSlackStatus = async (status) => {
  try {
    const user = await userService.getUserById(status.userId);
    const slackId = user.slackId;
    const slackStatus = status.status;

    console.log(`setSlackStatus: ${slackId}, ${slackStatus}`);
    // TODO call slack to update slack status.
    axios.post('', {});

  } catch (e) {
    console.error(`${JSON.stringify(e)}`);
  }
};

