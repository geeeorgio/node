import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

import { contactCategoryTypes, type ContactType } from '../../types/contact.js';

export interface ContactProps extends ContactType, Document {}

const contactsSchema = new Schema<ContactProps>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: contactCategoryTypes,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model<ContactProps>('contact', contactsSchema);

export default Contact;
