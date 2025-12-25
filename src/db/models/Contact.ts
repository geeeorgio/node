import { Schema, model } from 'mongoose';

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Contact = model('contact', contactsSchema);

export default Contact;
