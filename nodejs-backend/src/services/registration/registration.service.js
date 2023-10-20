const { Registration } = require('./registration.class');
const createModel = require('../../models/registration.model');
const hooks = require('./registration.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/registration', new Registration(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('registration');

  service.hooks(hooks);
};