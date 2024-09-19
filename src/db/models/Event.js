import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  organizer: { type: String, required: true },
});

export const Event = mongoose.model('Event', eventSchema);
