import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      maxlength: [50, 'Full name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Regular expression for email validation
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
      validate: {
        validator: function (value) {
          return value <= new Date(); // Ensure date of birth is not in the future
        },
        message: 'Date of birth cannot be in the future',
      },
    },
    referral: {
      type: String,
      maxlength: [100, 'Referral information cannot exceed 100 characters'],
      default: '',
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  { timestamps: true },
);

export const Participant = mongoose.model('Participant', participantSchema);
