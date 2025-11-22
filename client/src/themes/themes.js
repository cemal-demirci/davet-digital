// 6 Farklı Düğün Teması

export const themes = {
  'romantic-rose': {
    name: 'Romantic Rose',
    description: 'Klasik pembe ve altın tonlarında romantik tema',
    colors: {
      primary: '#ec4899',
      secondary: '#f9a8d4',
      accent: '#eab308',
      background: 'from-pink-50 via-white to-amber-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-pink-600',
    },
    fonts: {
      heading: 'font-script',
      body: 'font-sans'
    }
  },

  'elegant-black': {
    name: 'Elegant Black',
    description: 'Siyah, beyaz ve altın ile şık tema',
    colors: {
      primary: '#1f2937',
      secondary: '#4b5563',
      accent: '#d4af37',
      background: 'from-gray-900 via-gray-800 to-gray-900',
      cardBg: 'bg-gray-800',
      textPrimary: 'text-white',
      textSecondary: 'text-amber-400',
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans'
    }
  },

  'garden-green': {
    name: 'Garden Green',
    description: 'Doğa temalı yeşil tonlar',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#fbbf24',
      background: 'from-emerald-50 via-green-50 to-lime-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-emerald-700',
    },
    fonts: {
      heading: 'font-serif',
      body: 'font-sans'
    }
  },

  'ocean-blue': {
    name: 'Ocean Blue',
    description: 'Deniz mavisi ve turkuaz tonları',
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: 'from-cyan-50 via-blue-50 to-sky-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-cyan-700',
    },
    fonts: {
      heading: 'font-script',
      body: 'font-sans'
    }
  },

  'sunset-orange': {
    name: 'Sunset Orange',
    description: 'Gün batımı renkleri - turuncu ve sarı',
    colors: {
      primary: '#ea580c',
      secondary: '#fb923c',
      accent: '#fbbf24',
      background: 'from-orange-50 via-amber-50 to-yellow-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-orange-700',
    },
    fonts: {
      heading: 'font-script',
      body: 'font-sans'
    }
  },

  'purple-dream': {
    name: 'Purple Dream',
    description: 'Mor ve lila tonlarında rüya gibi tema',
    colors: {
      primary: '#9333ea',
      secondary: '#a855f7',
      accent: '#ec4899',
      background: 'from-purple-50 via-fuchsia-50 to-pink-50',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-purple-700',
    },
    fonts: {
      heading: 'font-script',
      body: 'font-sans'
    }
  }
};

export const getTheme = (themeName) => {
  return themes[themeName] || themes['romantic-rose'];
};
