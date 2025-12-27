import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

import { contactCategoryTypes, type ContactType } from '../../types/contact.js';

export interface ContactProps extends ContactType, Document {}

const contactsSchema = new Schema<ContactProps>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: contactCategoryTypes,
      required: true,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Contact = model<ContactProps>('contact', contactsSchema);

export default Contact;
