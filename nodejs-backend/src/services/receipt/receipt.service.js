const { Receipt } = require('./receipt.class');
const createModel = require('../../models/receipt.model');
const hooks = require('./receipt.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/receipt', new Receipt(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('receipt');

  service.hooks(hooks);
};