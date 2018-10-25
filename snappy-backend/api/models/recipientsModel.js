'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const NOTES_MAX_LENGTH = 500;
const PHONE_MAX_LENGTH = 10;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;

var RecipientSchema = new Schema({
  firstName: {
    type: String,
    required: 'Kindly enter the first name'
  },
  lastName: {
    type: String,
    required: 'Kindly enter the last name'
  },
  address: {
    type: String,
    required: 'Kindly enter the address (street, floor, apartment, etc.)'
  },
  zipCode: {
    type: String,
    required: 'Kindly enter the zip code'
  },
  city: {
    type: String,
    required: 'Kindly enter the city'
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return EMAIL_REGEX.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: 'Kindly enter the email'
  },
  phone: {
    type: Number,
    validate: {
      validator: function(v) {
        return v.toString().length < PHONE_MAX_LENGTH;
      },
      message: () => 'Too long phone (maximum is 10 digits)!'
    },
    required: 'Kindly enter the phone number'
  },
  notes: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length < NOTES_MAX_LENGTH;
      },
      message: () => 'Too long notes!'
    },
  }
});

module.exports = mongoose.model('Recipients', RecipientSchema);