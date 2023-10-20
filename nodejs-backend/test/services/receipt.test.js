const assert = require('assert');
const app = require('../../src/app');

describe('\'receipt\' service', () => {
  it('registered the service', () => {
    const service = app.service('receipt');

    assert.ok(service, 'Registered the service (receipt)');
  });
});
