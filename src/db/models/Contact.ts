import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

import { contactTypes, type ContactType } from '../../types/contact.js';

interface ContactProps extends ContactType, Document {}

const contactsSchema = new Schema<ContactProps>(
  {
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
    category: {
      type: String,
      enum: contactTypes,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model<ContactProps>('contact', contactsSchema);

export default Contact;
