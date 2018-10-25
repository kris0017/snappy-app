'use strict';


var mongoose = require('mongoose'),
  Recipient = mongoose.model('Recipients');

exports.getList = function(req, res) {
  Recipient.find({}, function(err, recipient) {
    if (err)
      res.send(err);
    res.json(recipient);
  });
};

exports.createRecipient = function(req, res) {
  var newRecipient = new Recipient(req.body);
  newRecipient.save(function(err, recipient) {
    if (err)
      res.send(err);
    res.json(recipient);
  });
};

exports.deleteRecipient = function(req, res) {
  Recipient.remove({
    _id: req.params.recipientId
  }, function(err, recipient) {
    if (err)
      res.send(err);
    res.json({ message: 'Recipient was successfully deleted' });
  });
};