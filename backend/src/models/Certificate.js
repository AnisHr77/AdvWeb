import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    refId:     { type: String, unique: true },  // e.g. ISC-ATT-2026-001
    delegate:  { type: String, required: true, trim: true },
    email:     { type: String, lowercase: true, trim: true, default: '' },
    type:      { type: String, enum: ['Attendance', 'Speaker', 'Presenter', 'Best Paper Award'], required: true },
    event:     { type: String, default: 'ISC 2026' },
    issuedDate: { type: Date, default: Date.now },
    filePath:  { type: String, default: null },  // path to generated PDF
  },
  { timestamps: true }
);

// Auto-generate refId before saving
certificateSchema.pre('save', async function () {
  if (!this.refId) {
    const prefix = this.type === 'Speaker' ? 'SPK' : this.type === 'Presenter' ? 'PRE' : 'ATT';
    const count = await mongoose.model('Certificate').countDocuments({ type: this.type });
    this.refId = `ISC-${prefix}-2026-${String(count + 1).padStart(3, '0')}`;
  }
});

export default mongoose.model('Certificate', certificateSchema);
