const { Lecturers } = require('./lecturers.class');
const createModel = require('../../models/lecturers.model');
const hooks = require('./lecturers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/lecturers', new Lecturers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lecturers');

  service.hooks(hooks);
};