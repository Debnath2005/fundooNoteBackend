/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    // email: {
    //   type: String
    // },
    title: {
      type: String
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
