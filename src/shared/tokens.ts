export const breakpoints = {
  mobile: '600px',
  tablet: '960px',
  laptop: '1264px',
  desktop: '1800px',
} as const

export const colors = {
  lime: {
    50: 'hsl(0 0% 100%)',
    100: 'hsl(82 85% 89%)',
    200: 'hsl(81 84% 78%)',
    300: 'hsl(81 84% 67%)',
    400: 'hsl(81 84% 56%)',
    500: 'hsl(81 65% 43%)',
    600: 'hsl(81 62% 30%)',
    700: 'hsl(82 58% 17%)',
    800: 'hsl(80 16% 4%)',
  },
  carbon: {
    50: 'hsl(60 1% 86%)',
    100: 'hsl(60 2% 68%)',
    200: 'hsl(75 2% 51%)',
    300: 'hsl(77 5% 30%)',
    350: 'hsl(75 10% 15%)',
    400: 'hsl(75 15% 10%)',
    500: 'hsl(69 16% 8%)',
    600: 'hsl(70 17% 7%)',
    700: 'hsl(72 16% 6%)',
    800: 'hsl(75 18% 4%)',
    900: 'hsl(77 19% 2%)',
  },
  semantics: {
    primary: 'var(--color-primary)',
    backgroundPrimary: 'var(--color-background-primary)',
    backgroundPrimaryHover: 'var(--color-background-primary-hover)',
    backgroundSecondary: 'var(--color-background-secondary)',
    backgroundHeader: 'var(--color-background-header)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    borderPrimary: 'var(--color-border-primary)',
    danger: 'var(--color-danger)',
  },
} as const

export const tokens = {
  breakpoints,
  colors,
} as const

export type Tokens = typeof tokens
