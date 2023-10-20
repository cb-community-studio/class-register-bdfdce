const users = require("./users/users.service.js");
const students = require("./students/students.service.js");
const courses = require("./courses/courses.service.js");
const sessions = require("./sessions/sessions.service.js");
const lecturers = require("./lecturers/lecturers.service.js");
const timetable = require("./timetable/timetable.service.js");
const enrollments = require("./enrollments/enrollments.service.js");
const purchaseorder = require("./purchaseorder/purchaseorder.service.js");
const invoices = require("./invoices/invoices.service.js");
const receipt = require("./receipt/receipt.service.js");
const discount = require("./discount/discount.service.js");
const transactions = require("./transactions/transactions.service.js");
const payment = require("./payment/payment.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(students);
  app.configure(courses);
  app.configure(sessions);
  app.configure(lecturers);
  app.configure(timetable);
  app.configure(enrollments);
  app.configure(purchaseorder);
  app.configure(invoices);
  app.configure(receipt);
  app.configure(discount);
  app.configure(transactions);
  app.configure(payment);
    // ~cb-add-configure-service-name~
};
