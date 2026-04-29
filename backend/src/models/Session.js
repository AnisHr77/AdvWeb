import mongoose from 'mongoose';

const speakerRefSchema = new mongoose.Schema(
  {
    name:  { type: String },
    title: { type: String },
    image: { type: String },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    day:         { type: Number, required: true, enum: [1, 2, 3] },
    date:        { type: String, default: '' },         // e.g. "Oct 14, 2026"
    startTime:   { type: String, required: true },      // e.g. "09:00 AM"
    endTime:     { type: String, default: '' },
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    track:       { type: String, default: 'General' },
    type:        {
      type: String,
      enum: ['Opening Ceremony', 'Keynote', 'Panel Discussion', 'Interactive Workshop', 'Break', 'Other'],
      default: 'Other'
    },
    location:    { type: String, default: '' },
    speakers:    [speakerRefSchema],
    isLive:      { type: Boolean, default: false },
    order:       { type: Number, default: 0 },         // for sorting within a day
  },
  { timestamps: true }
);

export default mongoose.model('Session', sessionSchema);
