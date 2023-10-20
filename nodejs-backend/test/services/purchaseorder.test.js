const assert = require('assert');
const app = require('../../src/app');

describe('\'purchaseorder\' service', () => {
  it('registered the service', () => {
    const service = app.service('purchaseorder');

    assert.ok(service, 'Registered the service (purchaseorder)');
  });
});
