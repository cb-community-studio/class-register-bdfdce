const users = require("./users/users.service.js");
const classes = require("./classes/classes.service.js");
const registration = require("./registration/registration.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(classes);
  app.configure(registration);
    // ~cb-add-configure-service-name~
};
