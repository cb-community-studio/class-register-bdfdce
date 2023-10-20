const { Enrollments } = require('./enrollments.class');
const createModel = require('../../models/enrollments.model');
const hooks = require('./enrollments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/enrollments', new Enrollments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('enrollments');

  service.hooks(hooks);
};