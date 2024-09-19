import { Participant } from '../db/models/Participant.js';
export const registerParticipant = async (req, res, next) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingParticipant = await Participant.findOne({
      email,
      eventId: id,
    });
    if (existingParticipant) {
      return res
        .status(400)
        .json({ message: 'Participant already registered for this event.' });
    }

    const newParticipant = new Participant({
      fullName,
      email,
      eventId: id,
    });

    await newParticipant.save();
    res.status(201).json({ message: 'Successfully registered for the event!' });
  } catch (error) {
    next(error);
  }
};

export const getParticipantsByEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const participants = await Participant.find({ eventId: id });

    if (participants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No participants found for this event.' });
    }

    res.status(200).json({
      data: participants,
    });
  } catch (error) {
    next(error);
  }
};
