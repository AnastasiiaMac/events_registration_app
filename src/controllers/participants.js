import { Participant } from '../db/models/Participant.js';
import { Event } from '../db/models/Event.js';

export const registerParticipant = async (req, res, next) => {
  const { id } = req.params; // `id` is the event ID from the URL
  const { fullName, email, dateOfBirth, referral } = req.body;

  try {
    // Check if the event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the participant is already registered for this event
    const existingParticipant = await Participant.findOne({
      email,
      eventId: id,
    });
    if (existingParticipant) {
      return res
        .status(400)
        .json({ message: 'Participant already registered for this event.' });
    }

    // Create and save the new participant
    const newParticipant = new Participant({
      fullName,
      email,
      dateOfBirth,
      referral,
      eventId: id, // Associate the participant with the event
    });

    await newParticipant.save();
    res.status(201).json({ message: 'Successfully registered for the event!' });
  } catch (error) {
    next(error); // Handle any errors that occur
  }
};

// Get all participants for a specific event
export const getParticipantsByEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find participants associated with the given event
    const participants = await Participant.find({ eventId: id });

    if (participants.length === 0) {
      return (
        res
          // .status(404)
          .json({ message: 'No participants found for this event.' })
      );
    }

    res.status(200).json({
      data: participants,
    });
  } catch (error) {
    next(error); // Handle any errors
  }
};
