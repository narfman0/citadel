const bodyParser = require('body-parser');
const express = require('express');
const OfficeService = require('./OfficeService');
const serverless = require('serverless-http');
const StatusService = require('./StatusService');
const UserService = require('./UserService');

const app = express();
const userService = new UserService();
const officeService = new OfficeService();
const statusService = new StatusService();

app.use(bodyParser.json({
  strict: false
}));

app.get('alexa/status/:alexaId', async (req, res, next) => {

  try {
    const user = await userService.getUserByAlexaId(req.params.alexaId);
    const status = await statusService.getStatusByUserId(user.userId);
    console.info(`status: ${status}`);

    res.json(status);

  } catch (e) {

    next(e);
  }
});

app.post('alexa/status', async (req, res, next) => {
  const {
    alexaId,
    alexaRoomId,
    status
  } = req.body;

  try {
    const user = await userService.getUserByAlexaId(alexaId);
    const office = await officeService.getOfficeByAlexaRoomId(alexaRoomId);
    const userStatus = await statusService.updateStatus(user.userId, office.officeId, status);
    await userService.updateUserCurrentOffice(user.userId, office.officeId);
    console.log(`status: ${userStatus}`);

    res.json(userStatus);

  } catch (e) {
    next(e);
  }
});

app.post('slack/status/:slackId', async (req, res, next) => {

  try {
    const user = userService.getUserBySlackId(req.params.slackId);
    const status = statusService.getStatusByUserId(user.userId);

    res.json(status);

  } catch (e) {
    next(e);
  }
});

app.post('slack/status', async (req, res, next) => {

  const {
    slackId,
    slackChannel,
    status
  } = req.body;

  try {
    const user = await userService.getUserBySlackId(slackId);
    const office = await officeService.getOfficeBySlackChannel(slackChannel);
    const userStatus = await statusService.updateStatus(user.userId, office.officeId, status);
    await userService.updateUserCurrentOffice(user.userId, office.officeId);
    console.log(`status: ${userStatus}`);

    res.json(userStatus);

  } catch (e) {
    next(e);
  }
});

module.exports.handler = serverless(app);
