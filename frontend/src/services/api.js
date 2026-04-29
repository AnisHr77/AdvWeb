/**
 * Central API client for AdvWeb conference frontend.
 * All API calls go through this file.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── helpers ──────────────────────────────────────────────────────────────────

const getToken = () => localStorage.getItem('admin_token');

const headers = (isJson = true) => {
  const h = {};
  if (isJson) h['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
};

// ── AUTH ─────────────────────────────────────────────────────────────────────

export const authAPI = {
  login: (email, password) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),

  me: () =>
    fetch(`${BASE_URL}/auth/me`, { headers: headers() }).then(handleResponse),

  logout: () =>
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: headers(),
    }).then(handleResponse),
};

// ── PUBLIC RESOURCES ─────────────────────────────────────────────────────────

export const registrationAPI = {
  submit: (data) =>
    fetch(`${BASE_URL}/registrations`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

export const submissionAPI = {
  submit: (formData) =>
    fetch(`${BASE_URL}/submissions`, {
      method: 'POST',
      headers: headers(false), // multipart — no Content-Type
      body: formData,
    }).then(handleResponse),

  saveDraft: (formData) =>
    fetch(`${BASE_URL}/submissions/draft`, {
      method: 'POST',
      headers: headers(false),
      body: formData,
    }).then(handleResponse),

  track: (email, refId) =>
    fetch(`${BASE_URL}/submissions/track?email=${encodeURIComponent(email)}&refId=${encodeURIComponent(refId)}`)
      .then(handleResponse),
};

export const speakerAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}/speakers${qs ? `?${qs}` : ''}`).then(handleResponse);
  },
};

export const sessionAPI = {
  getByDay: (day, filters = {}) => {
    const qs = new URLSearchParams({ day, ...filters }).toString();
    return fetch(`${BASE_URL}/sessions?${qs}`).then(handleResponse);
  },
};

export const certificateAPI = {
  verify: (id) =>
    fetch(`${BASE_URL}/certificates/verify?id=${encodeURIComponent(id)}`).then(handleResponse),
};

export const statsAPI = {
  getPublic: () => fetch(`${BASE_URL}/public/stats`).then(handleResponse),
  getCommittee: () => fetch(`${BASE_URL}/committee`).then(handleResponse),
};

// ── ADMIN RESOURCES ───────────────────────────────────────────────────────────

export const adminStatsAPI = {
  get: () =>
    fetch(`${BASE_URL}/admin/stats`, { headers: headers() }).then(handleResponse),
};

export const adminRegistrationsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}/admin/registrations${qs ? `?${qs}` : ''}`, { headers: headers() }).then(handleResponse);
  },
  create: (data) =>
    fetch(`${BASE_URL}/admin/registrations/admin`, {
      method: 'POST', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
  update: (id, data) =>
    fetch(`${BASE_URL}/admin/registrations/${id}`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
  remove: (id) =>
    fetch(`${BASE_URL}/admin/registrations/${id}`, {
      method: 'DELETE', headers: headers(),
    }).then(handleResponse),
  export: (format = 'csv') =>
    fetch(`${BASE_URL}/admin/registrations/export?format=${format}`, { headers: headers() }),
  resend: (id) =>
    fetch(`${BASE_URL}/admin/registrations/${id}/resend`, {
      method: 'POST', headers: headers(),
    }).then(handleResponse),
};

export const adminSubmissionsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}/admin/submissions${qs ? `?${qs}` : ''}`, { headers: headers() }).then(handleResponse);
  },
  getById: (id) =>
    fetch(`${BASE_URL}/admin/submissions/${id}`, { headers: headers() }).then(handleResponse),
  updateStatus: (id, status) =>
    fetch(`${BASE_URL}/admin/submissions/${id}/status`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify({ status }),
    }).then(handleResponse),
  remove: (id) =>
    fetch(`${BASE_URL}/admin/submissions/${id}`, {
      method: 'DELETE', headers: headers(),
    }).then(handleResponse),
};

export const adminSpeakersAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}/admin/speakers${qs ? `?${qs}` : ''}`, { headers: headers() }).then(handleResponse);
  },
  create: (data) =>
    fetch(`${BASE_URL}/admin/speakers`, {
      method: 'POST', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
  update: (id, data) =>
    fetch(`${BASE_URL}/admin/speakers/${id}`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
  updateStatus: (id, status) =>
    fetch(`${BASE_URL}/admin/speakers/${id}/status`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify({ status }),
    }).then(handleResponse),
  remove: (id) =>
    fetch(`${BASE_URL}/admin/speakers/${id}`, {
      method: 'DELETE', headers: headers(),
    }).then(handleResponse),
};

export const adminSessionsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}/admin/sessions${qs ? `?${qs}` : ''}`, { headers: headers() }).then(handleResponse);
  },
  create: (data) =>
    fetch(`${BASE_URL}/admin/sessions`, {
      method: 'POST', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
  update: (id, data) =>
    fetch(`${BASE_URL}/admin/sessions/${id}`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
  remove: (id) =>
    fetch(`${BASE_URL}/admin/sessions/${id}`, {
      method: 'DELETE', headers: headers(),
    }).then(handleResponse),
};

export const adminCertificatesAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return fetch(`${BASE_URL}/admin/certificates${qs ? `?${qs}` : ''}`, { headers: headers() }).then(handleResponse);
  },
  batchGenerate: (type, recipients) =>
    fetch(`${BASE_URL}/admin/certificates/batch`, {
      method: 'POST', headers: headers(), body: JSON.stringify({ type, recipients }),
    }).then(handleResponse),
  download: (id) =>
    fetch(`${BASE_URL}/admin/certificates/${id}/download`, { headers: headers() }),
  remove: (id) =>
    fetch(`${BASE_URL}/admin/certificates/${id}`, {
      method: 'DELETE', headers: headers(),
    }).then(handleResponse),
};

export const adminSettingsAPI = {
  get: () =>
    fetch(`${BASE_URL}/admin/settings`, { headers: headers() }).then(handleResponse),
  update: (data) =>
    fetch(`${BASE_URL}/admin/settings`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify(data),
    }).then(handleResponse),
};
