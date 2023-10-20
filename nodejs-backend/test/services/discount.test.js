const assert = require('assert');
const app = require('../../src/app');

describe('\'discount\' service', () => {
  it('registered the service', () => {
    const service = app.service('discount');

    assert.ok(service, 'Registered the service (discount)');
  });
});
