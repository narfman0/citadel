const Offices = require('../Offices').Offices;

describe('Offices', () => {

  describe('#constructor', () => {
    it('has has TABLE_NAME property.', () => {
      const offices = new Offices();
      expect(offices.hasOwnProperty('TABLE_NAME')).toBe(true);
    });

    it('has has db property.', () => {
      const offices = new Offices();
      expect(offices.hasOwnProperty('db')).toBe(true);
    });
  });

  describe('#getOfficeByAlexaRoomId(alexaRoomId)', () => {
    it.skip('works', () => {
      throw new Error('Unimplemented test.');
    });
  });

  describe('#getOfficeBySlackChannel(slackChannel)', () => {
    it.skip('works', () => { });
  });

  describe('#createOffice(alexaRoomId, slackChannel)', () => {
    it.skip('works', () => {
    });
  });
});
