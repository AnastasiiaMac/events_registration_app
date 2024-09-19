import { Event } from '../db/models/Event.js';

export const getAllEvents = async (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;

  try {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPerPage = parseInt(perPage, 10) || 10;

    const events = await Event.find()
      .skip((parsedPage - 1) * parsedPerPage)
      .limit(parsedPerPage);
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
      data: events,
      totalPages: Math.ceil(totalEvents / parsedPerPage),
      currentPage: parsedPage,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found event with id ${id}!`,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
