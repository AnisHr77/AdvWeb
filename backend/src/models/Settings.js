import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    // Singleton pattern — only one settings document
    _id: { type: String, default: 'conference_settings' },
    conferenceName:     { type: String, default: 'International Scientific Conference 2026' },
    abbreviation:       { type: String, default: 'ISC-26' },
    contactEmail:       { type: String, default: 'admin@isc2026.org' },
    twoFactorEnabled:   { type: Boolean, default: false },
    maintenanceMode:    { type: Boolean, default: false },
    conferenceDate:     { type: String, default: 'October 14-16, 2026' },
    conferenceLocation: { type: String, default: 'Geneva, Switzerland' },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
