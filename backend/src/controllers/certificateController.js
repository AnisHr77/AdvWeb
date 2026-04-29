import Certificate from '../models/Certificate.js';

// ──────────────────────────────────────────────
// PUBLIC
// ──────────────────────────────────────────────

// GET /api/certificates/verify?id=ISC-ATT-2026-001
export const verifyCertificate = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Certificate ID is required' });

    const cert = await Certificate.findOne({ refId: id.toUpperCase() });
    if (!cert)
      return res.status(404).json({ message: 'No certificate found for this ID', valid: false });

    res.json({
      valid: true,
      name:  cert.delegate,
      type:  cert.type,
      event: cert.event,
      issuedDate: cert.issuedDate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ──────────────────────────────────────────────
// ADMIN
// ──────────────────────────────────────────────

// GET /api/admin/certificates
export const getCertificates = async (req, res) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ delegate: re }, { refId: re }, { email: re }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Certificate.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Certificate.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin/certificates/batch
// body: { type: 'Attendance', recipients: [{ delegate, email }] }
export const batchGenerateCertificates = async (req, res) => {
  try {
    const { type, recipients } = req.body;
    if (!type || !Array.isArray(recipients) || recipients.length === 0)
      return res.status(400).json({ message: 'type and recipients[] are required' });

    const created = await Certificate.insertMany(
      recipients.map(r => ({ delegate: r.delegate, email: r.email, type }))
    );

    res.status(201).json({ message: `${created.length} certificates generated`, certificates: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/admin/certificates/:id/download
export const downloadCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    // If a real PDF was generated and stored, serve it:
    if (cert.filePath) {
      return res.download(cert.filePath);
    }

    // Stub: return JSON until a PDF generation library is added
    res.status(501).json({
      message: 'PDF generation not yet implemented. Install pdfkit to generate real PDFs.',
      certificate: cert,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/admin/certificates/:id
export const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate revoked and deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
