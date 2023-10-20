const assert = require('assert');
const app = require('../../src/app');

describe('\'timetable\' service', () => {
  it('registered the service', () => {
    const service = app.service('timetable');

    assert.ok(service, 'Registered the service (timetable)');
  });
});
