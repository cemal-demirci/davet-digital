const mongoose = require('mongoose');
const InvitationTemplate = require('../models/InvitationTemplate');
require('dotenv').config();

const templates = [
  {
    name: 'Klasik Düğün',
    description: 'Zarif ve zamanın ötesinde bir düğün davetiyesi',
    category: 'wedding',
    isPremium: false,
    layout: 'classic',
    orientation: 'portrait',
    size: {
      width: 1080,
      height: 1920
    },
    design: {
      background: {
        type: 'gradient',
        gradient: {
          from: '#8B5CF6',
          via: '#EC4899',
          to: '#EF4444',
          direction: 'to bottom'
        },
        opacity: 1
      },
      textSections: [
        {
          id: 'title',
          type: 'title',
          content: 'Sizleri Düğünümüze Davet Ediyoruz',
          position: { x: '50%', y: '15%', align: 'center' },
          style: {
            fontFamily: 'Great Vibes',
            fontSize: 48,
            fontWeight: 'normal',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: 2,
            lineHeight: 1.4
          },
          editable: true
        },
        {
          id: 'names',
          type: 'names',
          content: '{names}',
          position: { x: '50%', y: '40%', align: 'center' },
          style: {
            fontFamily: 'Great Vibes',
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            letterSpacing: 4,
            lineHeight: 1.2
          },
          editable: true
        },
        {
          id: 'date',
          type: 'date',
          content: '{date}',
          position: { x: '50%', y: '60%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 32,
            fontWeight: '600',
            color: '#ffffff',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        },
        {
          id: 'time',
          type: 'time',
          content: '{time}',
          position: { x: '50%', y: '70%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'normal',
            color: '#ffffff',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        },
        {
          id: 'location',
          type: 'location',
          content: '{location}',
          position: { x: '50%', y: '80%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 20,
            fontWeight: 'normal',
            color: '#ffffff',
            opacity: 0.9,
            lineHeight: 1.5
          },
          editable: true
        }
      ],
      imageSections: [],
      decorations: []
    }
  },
  {
    name: 'Modern Minimalist',
    description: 'Sade ve şık modern tasarım',
    category: 'wedding',
    isPremium: true,
    layout: 'modern',
    orientation: 'portrait',
    size: {
      width: 1080,
      height: 1920
    },
    design: {
      background: {
        type: 'solid',
        color: '#1F2937',
        opacity: 1
      },
      textSections: [
        {
          id: 'names',
          type: 'names',
          content: '{names}',
          position: { x: '50%', y: '45%', align: 'center' },
          style: {
            fontFamily: 'Montserrat',
            fontSize: 64,
            fontWeight: '300',
            color: '#F9FAFB',
            letterSpacing: 8,
            lineHeight: 1.2
          },
          editable: true
        },
        {
          id: 'date',
          type: 'date',
          content: '{date}',
          position: { x: '50%', y: '60%', align: 'center' },
          style: {
            fontFamily: 'Montserrat',
            fontSize: 24,
            fontWeight: '400',
            color: '#D1D5DB',
            letterSpacing: 2,
            lineHeight: 1.5
          },
          editable: true
        },
        {
          id: 'location',
          type: 'location',
          content: '{location}',
          position: { x: '50%', y: '75%', align: 'center' },
          style: {
            fontFamily: 'Montserrat',
            fontSize: 18,
            fontWeight: '300',
            color: '#9CA3AF',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        }
      ],
      imageSections: [],
      decorations: []
    }
  },
  {
    name: 'Çiçek Bahçesi',
    description: 'Bahar temalı çiçekli davetiye',
    category: 'wedding',
    isPremium: false,
    layout: 'floral',
    orientation: 'portrait',
    size: {
      width: 1080,
      height: 1920
    },
    design: {
      background: {
        type: 'gradient',
        gradient: {
          from: '#FDF2F8',
          via: '#FCE7F3',
          to: '#FBD5E5',
          direction: 'to bottom'
        },
        opacity: 1
      },
      textSections: [
        {
          id: 'title',
          type: 'title',
          content: 'Birlikte Davet Ediyoruz',
          position: { x: '50%', y: '20%', align: 'center' },
          style: {
            fontFamily: 'Great Vibes',
            fontSize: 42,
            fontWeight: 'normal',
            color: '#BE185D',
            letterSpacing: 2,
            lineHeight: 1.4
          },
          editable: true
        },
        {
          id: 'names',
          type: 'names',
          content: '{names}',
          position: { x: '50%', y: '45%', align: 'center' },
          style: {
            fontFamily: 'Great Vibes',
            fontSize: 68,
            fontWeight: 'bold',
            color: '#9F1239',
            letterSpacing: 3,
            lineHeight: 1.2
          },
          editable: true
        },
        {
          id: 'date',
          type: 'date',
          content: '{date}',
          position: { x: '50%', y: '65%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 28,
            fontWeight: '500',
            color: '#BE185D',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        }
      ],
      imageSections: [],
      decorations: []
    }
  },
  {
    name: 'Kurumsal Etkinlik',
    description: 'Profesyonel kurumsal etkinlik davetiyesi',
    category: 'corporate',
    isPremium: false,
    layout: 'modern',
    orientation: 'landscape',
    size: {
      width: 1920,
      height: 1080
    },
    design: {
      background: {
        type: 'gradient',
        gradient: {
          from: '#1E3A8A',
          via: '#3B82F6',
          to: '#60A5FA',
          direction: 'to right'
        },
        opacity: 1
      },
      textSections: [
        {
          id: 'title',
          type: 'title',
          content: 'Sizi Davet Ediyoruz',
          position: { x: '50%', y: '25%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 52,
            fontWeight: '600',
            color: '#ffffff',
            letterSpacing: 2,
            lineHeight: 1.3
          },
          editable: true
        },
        {
          id: 'event-name',
          type: 'custom',
          content: '{names}',
          position: { x: '50%', y: '45%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 64,
            fontWeight: '700',
            color: '#FEF3C7',
            letterSpacing: 3,
            lineHeight: 1.2
          },
          editable: true
        },
        {
          id: 'date-time',
          type: 'date',
          content: '{date} | {time}',
          position: { x: '50%', y: '65%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 28,
            fontWeight: '500',
            color: '#ffffff',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        }
      ],
      imageSections: [],
      decorations: []
    }
  },
  {
    name: 'Nişan Kutlaması',
    description: 'Romantik nişan davetiyesi',
    category: 'engagement',
    isPremium: false,
    layout: 'elegant',
    orientation: 'portrait',
    size: {
      width: 1080,
      height: 1920
    },
    design: {
      background: {
        type: 'gradient',
        gradient: {
          from: '#FECACA',
          via: '#FCA5A5',
          to: '#F87171',
          direction: 'to bottom'
        },
        opacity: 1
      },
      textSections: [
        {
          id: 'title',
          type: 'title',
          content: 'Nişan Törenimize Davetlisiniz',
          position: { x: '50%', y: '18%', align: 'center' },
          style: {
            fontFamily: 'Great Vibes',
            fontSize: 44,
            fontWeight: 'normal',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: 2,
            lineHeight: 1.4
          },
          editable: true
        },
        {
          id: 'names',
          type: 'names',
          content: '{names}',
          position: { x: '50%', y: '42%', align: 'center' },
          style: {
            fontFamily: 'Great Vibes',
            fontSize: 70,
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
            letterSpacing: 4,
            lineHeight: 1.2
          },
          editable: true
        },
        {
          id: 'date',
          type: 'date',
          content: '{date}',
          position: { x: '50%', y: '65%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 30,
            fontWeight: '600',
            color: '#ffffff',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        }
      ],
      imageSections: [],
      decorations: []
    }
  },
  {
    name: 'Doğum Günü Partisi',
    description: 'Renkli ve eğlenceli doğum günü davetiyesi',
    category: 'birthday',
    isPremium: false,
    layout: 'modern',
    orientation: 'portrait',
    size: {
      width: 1080,
      height: 1920
    },
    design: {
      background: {
        type: 'gradient',
        gradient: {
          from: '#FBBF24',
          via: '#F59E0B',
          to: '#F97316',
          direction: 'to bottom'
        },
        opacity: 1
      },
      textSections: [
        {
          id: 'title',
          type: 'title',
          content: 'Doğum Günü Partisine Davetlisiniz!',
          position: { x: '50%', y: '20%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 40,
            fontWeight: '700',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: 1,
            lineHeight: 1.3
          },
          editable: true
        },
        {
          id: 'name',
          type: 'names',
          content: '{names}',
          position: { x: '50%', y: '45%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 64,
            fontWeight: '800',
            color: '#ffffff',
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            letterSpacing: 2,
            lineHeight: 1.2
          },
          editable: true
        },
        {
          id: 'age',
          type: 'custom',
          content: '🎉',
          position: { x: '50%', y: '60%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 80,
            fontWeight: '700',
            color: '#ffffff',
            lineHeight: 1
          },
          editable: true
        },
        {
          id: 'date',
          type: 'date',
          content: '{date} | {time}',
          position: { x: '50%', y: '75%', align: 'center' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 28,
            fontWeight: '600',
            color: '#ffffff',
            letterSpacing: 1,
            lineHeight: 1.5
          },
          editable: true
        }
      ],
      imageSections: [],
      decorations: []
    }
  }
];

async function seedTemplates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-website', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('Connected to MongoDB');

    // Clear existing templates
    await InvitationTemplate.deleteMany({});
    console.log('Cleared existing templates');

    // Insert new templates
    const insertedTemplates = await InvitationTemplate.insertMany(templates);
    console.log(`Inserted ${insertedTemplates.length} templates`);

    console.log('\nTemplates seeded successfully!');
    console.log('Categories:', [...new Set(templates.map(t => t.category))]);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
}

seedTemplates();
