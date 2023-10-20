const { Timetable } = require('./timetable.class');
const createModel = require('../../models/timetable.model');
const hooks = require('./timetable.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/timetable', new Timetable(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('timetable');

  service.hooks(hooks);
};