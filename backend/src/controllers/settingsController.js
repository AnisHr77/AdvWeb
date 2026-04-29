import Settings from '../models/Settings.js';

// GET /api/admin/settings
export const getSettings = async (_req, res) => {
  try {
    let settings = await Settings.findById('conference_settings');
    if (!settings) {
      settings = await Settings.create({ _id: 'conference_settings' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/settings
export const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findByIdAndUpdate(
      'conference_settings',
      { ...req.body, _id: 'conference_settings' },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ message: 'Settings saved', settings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
