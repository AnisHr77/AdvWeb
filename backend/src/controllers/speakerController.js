import Speaker from '../models/Speaker.js';

// ──────────────────────────────────────────────
// PUBLIC
// ──────────────────────────────────────────────

// GET /api/speakers
// Supports: ?featured=true, ?type=keynote|invited, ?theme=, ?country=, ?search=
export const getSpeakers = async (req, res) => {
  try {
    const { featured, type, theme, country, search, limit } = req.query;
    const filter = {};

    if (featured === 'true') filter.isFeatured = true;
    if (type)    filter.type    = type;
    if (theme)   filter.track   = new RegExp(theme, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ name: re }, { tag: re }, { title: re }, { institution: re }];
    }

    let query = Speaker.find(filter).sort({ type: 1, createdAt: -1 });
    if (limit) query = query.limit(Number(limit));

    const speakers = await query;
    res.json(speakers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ──────────────────────────────────────────────
// ADMIN
// ──────────────────────────────────────────────

// POST /api/admin/speakers
export const createSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.create(req.body);
    res.status(201).json(speaker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/speakers/:id
export const updateSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!speaker) return res.status(404).json({ message: 'Speaker not found' });
    res.json(speaker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/speakers/:id/status
export const updateSpeakerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Confirmed', 'Pending', 'Invited'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(', ')}` });

    const speaker = await Speaker.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!speaker) return res.status(404).json({ message: 'Speaker not found' });
    res.json(speaker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/speakers/:id
export const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker) return res.status(404).json({ message: 'Speaker not found' });
    res.json({ message: 'Speaker deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
