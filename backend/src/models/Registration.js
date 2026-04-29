import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    fullName:     { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:        { type: String, trim: true, default: '' },
    institution:  { type: String, required: true, trim: true },
    country:      { type: String, required: true },
    type:         { type: String, enum: ['Author', 'Attendee', 'Student', 'Presenter', 'Full Delegate'], required: true },
    requirements: { type: String, default: '' },
    status:       { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    confirmationSentAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Registration', registrationSchema);
