const statuses = require('statuses');

module.exports.buildResponse = (status, payload) => {
  return {
    statusCode: statuses(status),
    body: {
      payload
    }
  };
};

module.exports.success = (payload) => {
  return this.buildResponse(statuses['OK'], payload);
};
