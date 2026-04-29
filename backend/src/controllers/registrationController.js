import Registration from '../models/Registration.js';

// ──────────────────────────────────────────────
// PUBLIC
// ──────────────────────────────────────────────

// POST /api/registrations
export const createRegistration = async (req, res) => {
  try {
    const { fullName, email, phone, institution, country, type, requirements } = req.body;

    const exists = await Registration.findOne({ email });
    if (exists)
      return res.status(409).json({ message: 'An account with this email already exists' });

    const registration = await Registration.create({
      fullName, email, phone, institution, country, type, requirements,
    });

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: 'Email already registered' });
    res.status(500).json({ message: err.message });
  }
};

// ──────────────────────────────────────────────
// ADMIN
// ──────────────────────────────────────────────

// GET /api/admin/registrations
export const getRegistrations = async (req, res) => {
  try {
    const { status, type, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type)   filter.type   = type;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ fullName: re }, { email: re }, { institution: re }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Registration.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Registration.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/registrations  (manual add)
export const adminCreateRegistration = async (req, res) => {
  try {
    const registration = await Registration.create({ ...req.body, status: 'Confirmed' });
    res.status(201).json(registration);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: 'Email already registered' });
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/admin/registrations/:id
export const updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/registrations/:id
export const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    res.json({ message: 'Registration deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/registrations/export?format=csv|pdf
export const exportRegistrations = async (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    const items = await Registration.find().sort({ createdAt: -1 });

    if (format === 'csv') {
      const header = 'Full Name,Email,Phone,Institution,Country,Type,Status,Registered At\n';
      const rows = items.map(r =>
        `"${r.fullName}","${r.email}","${r.phone}","${r.institution}","${r.country}","${r.type}","${r.status}","${r.createdAt.toISOString()}"`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="registrations.csv"');
      return res.send(header + rows);
    }

    // PDF stub — respond with JSON if no PDF library is installed
    res.status(501).json({ message: 'PDF export: install a PDF library (e.g. pdfkit) to enable this.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/registrations/:id/resend-confirmation
export const resendConfirmation = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { confirmationSentAt: new Date() },
      { new: true }
    );
    if (!registration) return res.status(404).json({ message: 'Registration not found' });
    // TODO: wire up an email service (nodemailer / SendGrid)
    res.json({ message: `Confirmation email queued for ${registration.email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
