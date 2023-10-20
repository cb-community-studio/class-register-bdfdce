const { Discount } = require('./discount.class');
const createModel = require('../../models/discount.model');
const hooks = require('./discount.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/discount', new Discount(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('discount');

  service.hooks(hooks);
};