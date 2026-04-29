import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './src/models/Admin.js';
import Speaker from './src/models/Speaker.js';
import Session from './src/models/Session.js';
import Settings from './src/models/Settings.js';
import Registration from './src/models/Registration.js';
import Submission from './src/models/Submission.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Speaker.deleteMany({}),
      Session.deleteMany({}),
      Settings.deleteMany({}),
      Registration.deleteMany({}),
      Submission.deleteMany({}),
    ]);

    console.log('🧹 Cleared existing data.');

    // 1. Create Admin
    const hashedEmail = 'admin@isc2026.org';
    await Admin.create({
      name: 'System Administrator',
      email: hashedEmail,
      password: 'admin123', // Model middleware will hash this
      role: 'superadmin'
    });
    console.log('👤 Admin created (admin@isc2026.org / admin123)');

    // 2. Create Settings
    await Settings.create({
      conferenceName: 'International Scientific Conference 2026',
      abbreviation: 'ISC 2026',
      contactEmail: 'info@isc2026.org',
      maintenanceMode: false
    });

    // 3. Create Speakers
    const speakers = await Speaker.insertMany([
      {
        name: 'Dr. Sarah Jenkins',
        title: 'Prof. of Computer Science',
        institution: 'MIT',
        bio: 'Leading researcher in neural architectures and AI ethics.',
        tag: 'Artificial Intelligence',
        country: 'USA',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        featured: true,
        status: 'Confirmed'
      },
      {
        name: 'Dr. Robert Hayes',
        title: 'Chief Cryptographer',
        institution: 'TechSecure',
        bio: 'Expert in quantum-resistant encryption methods.',
        tag: 'Cybersecurity',
        country: 'United Kingdom',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        featured: true,
        status: 'Confirmed'
      },
      {
        name: 'Prof. Amina Diop',
        title: 'Lead Data Scientist',
        institution: 'Data Institute',
        bio: 'Specializing in predictive analytics for global healthcare.',
        tag: 'Data Science',
        country: 'Senegal',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
        featured: false,
        status: 'Confirmed'
      }
    ]);
    console.log('📢 Speakers added.');

    // 4. Create Sessions
    await Session.insertMany([
      {
        title: 'Opening Ceremony & Welcome Address',
        description: 'Official commencement of ISC 2026.',
        day: 1,
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        location: 'Main Auditorium',
        type: 'Opening Ceremony',
        track: 'General'
      },
      {
        title: 'Future of AI Keynote',
        description: 'Exploring the next decade of artificial intelligence.',
        day: 1,
        startTime: '10:30 AM',
        endTime: '11:30 AM',
        location: 'Hall A',
        type: 'Keynote',
        track: 'Artificial Intelligence',
        speakers: [speakers[0]._id]
      }
    ]);
    console.log('📅 Sessions added.');

    // 5. Add a test registration
    await Registration.create({
      fullName: 'Test Participant',
      email: 'test@example.com',
      institution: 'Global University',
      country: 'Switzerland',
      type: 'Attendee',
      status: 'Confirmed'
    });

    console.log('✅ Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
