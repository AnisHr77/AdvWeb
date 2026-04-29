import Session from '../models/Session.js';

// ──────────────────────────────────────────────
// PUBLIC
// ──────────────────────────────────────────────

// GET /api/sessions?day=1
export const getSessions = async (req, res) => {
  try {
    const { day, track, type, location } = req.query;
    const filter = {};
    if (day)      filter.day   = Number(day);
    if (track && track !== 'All Tracks')        filter.track = track;
    if (type  && type  !== 'All Session Types') filter.type  = type;
    if (location && location !== 'Location')    filter.location = new RegExp(location, 'i');

    const sessions = await Session.find(filter).sort({ day: 1, order: 1, startTime: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ──────────────────────────────────────────────
// ADMIN
// ──────────────────────────────────────────────

// POST /api/admin/sessions
export const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/sessions/:id
export const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/sessions/:id
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
