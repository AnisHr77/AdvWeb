import mongoose from 'mongoose';

const speakerSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    title:       { type: String, trim: true, default: '' },  // job title
    institution: { type: String, trim: true, default: '' },
    country:     { type: String, trim: true, default: '' },
    track:       { type: String, trim: true, default: '' },
    bio:         { type: String, default: '' },
    image:       { type: String, default: '' },  // URL or file path
    tag:         { type: String, default: '' },  // display tag, usually same as track
    type:        { type: String, enum: ['keynote', 'invited'], default: 'invited' },
    status:      { type: String, enum: ['Confirmed', 'Pending', 'Invited'], default: 'Invited' },
    isFeatured:  { type: Boolean, default: false },
    sessionNote: { type: String, default: '' },  // e.g. "Keynote: The Future of..."
  },
  { timestamps: true }
);

export default mongoose.model('Speaker', speakerSchema);
