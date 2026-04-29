import Submission from '../models/Submission.js';

// ──────────────────────────────────────────────
// PUBLIC
// ──────────────────────────────────────────────

// POST /api/submissions  (multipart/form-data)
export const createSubmission = async (req, res) => {
  try {
    const {
      title, track, abstract, keywords,
      primaryAuthorName, primaryAuthorEmail, primaryAuthorInstitution,
      coAuthors, correspondingAuthor,
    } = req.body;

    // coAuthors arrives as JSON string from FormData
    let parsedCoAuthors = [];
    if (coAuthors) {
      try { parsedCoAuthors = JSON.parse(coAuthors); } catch { parsedCoAuthors = []; }
    }

    // keywords can be comma-separated string or JSON array
    let parsedKeywords = [];
    if (keywords) {
      try { parsedKeywords = JSON.parse(keywords); } catch { parsedKeywords = keywords.split(',').map(k => k.trim()); }
    }

    const submission = await Submission.create({
      title,
      track,
      abstract,
      keywords: parsedKeywords,
      primaryAuthor: { name: primaryAuthorName, email: primaryAuthorEmail, institution: primaryAuthorInstitution },
      coAuthors: parsedCoAuthors,
      correspondingAuthor,
      filePath: req.file ? req.file.path : null,
      fileName: req.file ? req.file.originalname : null,
      isDraft: false,
      status: 'Under Review',
    });

    res.status(201).json({ message: 'Paper submitted successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/submissions/draft
export const saveDraft = async (req, res) => {
  try {
    const {
      title, track, abstract, keywords,
      primaryAuthorName, primaryAuthorEmail, primaryAuthorInstitution,
      coAuthors, correspondingAuthor,
    } = req.body;

    let parsedCoAuthors = [];
    if (coAuthors) {
      try { parsedCoAuthors = JSON.parse(coAuthors); } catch { parsedCoAuthors = []; }
    }
    let parsedKeywords = [];
    if (keywords) {
      try { parsedKeywords = JSON.parse(keywords); } catch { parsedKeywords = keywords.split(',').map(k => k.trim()); }
    }

    const submission = await Submission.create({
      title,
      track,
      abstract,
      keywords: parsedKeywords,
      primaryAuthor: { name: primaryAuthorName, email: primaryAuthorEmail, institution: primaryAuthorInstitution },
      coAuthors: parsedCoAuthors,
      correspondingAuthor,
      filePath: req.file ? req.file.path : null,
      fileName: req.file ? req.file.originalname : null,
      isDraft: true,
      status: 'Draft',
    });

    res.status(201).json({ message: 'Draft saved', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/submissions/track?email=&refId=
export const trackSubmission = async (req, res) => {
  try {
    const { email, refId } = req.query;
    if (!email || !refId)
      return res.status(400).json({ message: 'Both email and refId are required' });

    const submission = await Submission.findOne({
      refId,
      correspondingAuthor: email.toLowerCase(),
    });

    if (!submission)
      return res.status(404).json({ message: 'No submission found for the provided email and reference ID' });

    const stepMap = { Draft: 1, 'Under Review': 2, Reviewed: 3, Accepted: 4, Rejected: 4 };
    const currentStep = stepMap[submission.status] || 2;

    const steps = [
      { label: 'Submitted',      sub: new Date(submission.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }), state: currentStep >= 1 ? 'done' : 'pending' },
      { label: 'Under Review',   sub: currentStep === 2 ? 'In Progress' : currentStep > 2 ? 'Completed' : 'Pending', state: currentStep === 2 ? 'active' : currentStep > 2 ? 'done' : 'pending' },
      { label: 'Reviewed',       sub: 'Pending', state: currentStep === 3 ? 'active' : currentStep > 3 ? 'done' : 'pending' },
      { label: 'Final Decision', sub: currentStep >= 4 ? submission.status : 'Pending', state: currentStep >= 4 ? 'active' : 'pending' },
    ];

    res.json({
      refId: submission.refId,
      title: submission.title,
      status: submission.status.toUpperCase(),
      submissionDate: new Date(submission.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      track: submission.track,
      correspondingAuthor: submission.correspondingAuthor,
      file: submission.fileName || null,
      steps,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ──────────────────────────────────────────────
// ADMIN
// ──────────────────────────────────────────────

// GET /api/admin/submissions
export const getSubmissions = async (req, res) => {
  try {
    const { status, track, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    if (track)  filter.track  = track;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ title: re }, { refId: re }, { 'primaryAuthor.name': re }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Submission.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Submission.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/submissions/:id
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/submissions/:id/status
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Under Review', 'Accepted', 'Rejected'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(', ')}` });

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/submissions/:id
export const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
