const { Purchaseorder } = require('./purchaseorder.class');
const createModel = require('../../models/purchaseorder.model');
const hooks = require('./purchaseorder.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/purchaseorder', new Purchaseorder(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('purchaseorder');

  service.hooks(hooks);
};