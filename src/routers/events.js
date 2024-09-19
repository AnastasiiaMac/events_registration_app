import express from 'express';
import { getAllEvents, getEventById } from '../controllers/events.js';
import {
  registerParticipant,
  getParticipantsByEvent,
} from '../controllers/participants.js';

const router = express.Router();

// Route to get all events (paginated)
router.get('/', getAllEvents);

// Route to get a single event by ID
router.get('/:id', getEventById);

// Route to register a participant for an event
router.post('/:id/register', registerParticipant);

// Route to get participants for a specific event
router.get('/:id/participants', getParticipantsByEvent);

export default router;
