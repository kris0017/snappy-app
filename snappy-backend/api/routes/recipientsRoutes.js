'use strict';
module.exports = function(app) {
  var recipients = require('../controllers/recipientsController');

  // recipients Routes
  app.route('/recipients')
    .get(recipients.getList)
    .post(recipients.createRecipient);

  app.route('/recipients/:recipientId')
    .delete(recipients.deleteRecipient);
};

