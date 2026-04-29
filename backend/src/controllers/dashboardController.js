import Registration from '../models/Registration.js';
import Submission from '../models/Submission.js';
import Speaker from '../models/Speaker.js';
import Session from '../models/Session.js';

// GET /api/admin/stats
export const getDashboardStats = async (_req, res) => {
  try {
    const [
      totalSpeakers,
      totalSubmissions,
      totalRegistrations,
      activeSessions,
      recentSubmissions,
    ] = await Promise.all([
      Speaker.countDocuments(),
      Submission.countDocuments({ isDraft: false }),
      Registration.countDocuments(),
      Session.countDocuments(),
      Submission.find({ isDraft: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('refId title primaryAuthor track status createdAt'),
    ]);

    res.json({
      stats: {
        totalSpeakers,
        totalSubmissions,
        totalRegistrations,
        activeSessions,
      },
      recentSubmissions: recentSubmissions.map(s => ({
        id:     s.refId,
        title:  s.title,
        author: s.primaryAuthor?.name || '—',
        track:  s.track,
        status: s.status,
        date:   s.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/stats  (public homepage stats)
export const getPublicStats = async (_req, res) => {
  try {
    const [speakers, submissions, registrations] = await Promise.all([
      Speaker.countDocuments({ status: 'Confirmed' }),
      Submission.countDocuments({ status: { $in: ['Under Review', 'Accepted'] } }),
      Registration.countDocuments({ status: 'Confirmed' }),
    ]);

    res.json({
      speakers,
      submissions,
      registrations,
      countries: 45,      // update when a countries field is aggregated
      attendeesExpected: 5000,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/committee  (static for now — can be a DB model later)
export const getCommittee = async (_req, res) => {
  res.json([
    { name: 'Prof. Heinrich Muller', role: 'Conference Chair', institution: 'ETH Zurich', country: 'Switzerland' },
    { name: 'Dr. Sarah Jenkins',     role: 'Program Co-Chair', institution: 'MIT', country: 'USA' },
    { name: 'Prof. Amina Diop',      role: 'Publications Chair', institution: 'Data Institute', country: 'Senegal' },
    { name: 'Dr. Kenji Tanaka',      role: 'Organizing Committee', institution: 'Kyoto University', country: 'Japan' },
    { name: 'Dr. Robert Hayes',      role: 'Workshop Chair', institution: 'TechSecure', country: 'UK' },
  ]);
};
