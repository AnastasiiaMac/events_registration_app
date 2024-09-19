import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  referral: { type: String }, // Where did you hear about this event
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
});

export const Participant = mongoose.model('Participant', participantSchema);
