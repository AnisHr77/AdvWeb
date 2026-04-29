import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, lowercase: true, trim: true },
    institution: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema(
  {
    refId:               { type: String, unique: true }, // auto-generated, e.g. ISC-2026-XXXX
    title:               { type: String, required: true, trim: true },
    track:               { type: String, required: true },
    abstract:            { type: String, required: true },
    keywords:            [{ type: String }],
    primaryAuthor:       { type: authorSchema, required: true },
    coAuthors:           [authorSchema],
    correspondingAuthor: { type: String, required: true }, // email
    filePath:            { type: String, default: null }, // stored file path
    fileName:            { type: String, default: null },
    status:              { type: String, enum: ['Draft', 'Under Review', 'Accepted', 'Rejected'], default: 'Under Review' },
    isDraft:             { type: Boolean, default: false },
    reviewStep:          { type: Number, default: 1 }, // 1=Submitted, 2=Under Review, 3=Reviewed, 4=Final Decision
  },
  { timestamps: true }
);

// Auto-generate refId before saving
submissionSchema.pre('save', async function () {
  if (!this.refId) {
    const count = await mongoose.model('Submission').countDocuments();
    this.refId = `ISC-2026-${String(count + 1).padStart(4, '0')}`;
  }
});

export default mongoose.model('Submission', submissionSchema);
