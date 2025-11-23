// Theme color mapping for dynamic Tailwind classes
export const themeColorMap = {
  'romantic-rose': {
    primary: 'pink',
    secondary: 'rose',
    accent: 'fuchsia'
  },
  'elegant-black': {
    primary: 'gray',
    secondary: 'amber',
    accent: 'yellow'
  },
  'garden-green': {
    primary: 'emerald',
    secondary: 'green',
    accent: 'teal'
  },
  'ocean-blue': {
    primary: 'cyan',
    secondary: 'blue',
    accent: 'sky'
  },
  'sunset-orange': {
    primary: 'orange',
    secondary: 'amber',
    accent: 'yellow'
  },
  'purple-dream': {
    primary: 'purple',
    secondary: 'fuchsia',
    accent: 'violet'
  },
  'lavender-mint': {
    primary: 'violet',
    secondary: 'teal',
    accent: 'purple'
  },
  'coral-peach': {
    primary: 'rose',
    secondary: 'orange',
    accent: 'pink'
  },
  'royal-navy': {
    primary: 'blue',
    secondary: 'amber',
    accent: 'indigo'
  },
  'champagne-gold': {
    primary: 'yellow',
    secondary: 'amber',
    accent: 'orange'
  }
}

export const getThemeClasses = (themeName = 'romantic-rose') => {
  const theme = themeColorMap[themeName] || themeColorMap['romantic-rose']

  return {
    // Backgrounds
    bgPrimary50: `bg-${theme.primary}-50`,
    bgPrimary100: `bg-${theme.primary}-100`,
    bgPrimary200: `bg-${theme.primary}-200`,
    bgPrimary500: `bg-${theme.primary}-500`,
    bgPrimary600: `bg-${theme.primary}-600`,
    bgPrimary700: `bg-${theme.primary}-700`,

    bgSecondary50: `bg-${theme.secondary}-50`,
    bgSecondary100: `bg-${theme.secondary}-100`,
    bgSecondary500: `bg-${theme.secondary}-500`,

    // Text colors
    textPrimary500: `text-${theme.primary}-500`,
    textPrimary600: `text-${theme.primary}-600`,
    textPrimary700: `text-${theme.primary}-700`,
    textPrimary800: `text-${theme.primary}-800`,

    textSecondary500: `text-${theme.secondary}-500`,
    textSecondary600: `text-${theme.secondary}-600`,

    // Border colors
    borderPrimary100: `border-${theme.primary}-100`,
    borderPrimary300: `border-${theme.primary}-300`,
    borderPrimary500: `border-${theme.primary}-500`,

    // Ring/Focus colors
    ringPrimary500: `ring-${theme.primary}-500`,
    focusRingPrimary500: `focus:ring-${theme.primary}-500`,
    focusBorderPrimary500: `focus:border-${theme.primary}-500`,

    // Hover states
    hoverBgPrimary600: `hover:bg-${theme.primary}-600`,
    hoverBgPrimary700: `hover:bg-${theme.primary}-700`,
    hoverTextPrimary600: `hover:text-${theme.primary}-600`,

    // Gradients - vibrant and clear
    gradientPrimary: `from-${theme.primary}-100 via-${theme.secondary}-100 to-${theme.accent}-50`,
    gradientDark: `from-${theme.primary}-600 via-${theme.secondary}-600 to-${theme.accent}-700`,
    gradientHero: `from-${theme.primary}-200 via-${theme.secondary}-200 to-${theme.accent}-100`,
    gradientButton: `from-${theme.primary}-500 via-${theme.secondary}-500 to-${theme.accent}-600`,

    // Raw color names for dynamic usage
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent
  }
}

// Helper to get gradient background class
export const getGradientClass = (themeName = 'romantic-rose') => {
  const classes = getThemeClasses(themeName)
  return `bg-gradient-to-br ${classes.gradientPrimary}`
}

// Helper to get hero gradient
export const getHeroGradient = (themeName = 'romantic-rose') => {
  const classes = getThemeClasses(themeName)
  return `bg-gradient-to-br ${classes.gradientHero}`
}

// Get text color for contrast - for headings and primary text
export const getTextColor = (themeName = 'romantic-rose') => {
  const darkThemes = ['elegant-black', 'royal-navy']
  if (darkThemes.includes(themeName)) {
    return 'text-white'
  }
  return 'text-gray-900'
}

// Get secondary text color - for descriptions and body text
export const getSecondaryTextColor = (themeName = 'romantic-rose') => {
  const darkThemes = ['elegant-black', 'royal-navy']
  if (darkThemes.includes(themeName)) {
    return 'text-gray-300'
  }
  return 'text-gray-700'
}

// Get card background color with proper contrast
export const getCardBgColor = (themeName = 'romantic-rose') => {
  const darkThemes = ['elegant-black', 'royal-navy']
  if (darkThemes.includes(themeName)) {
    return 'bg-gray-800/50 backdrop-blur-sm'
  }
  return 'bg-white/90 backdrop-blur-sm'
}
