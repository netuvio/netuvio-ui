export const breakpoints = {
  mobile: '600px',
  tablet: '960px',
  laptop: '1264px',
  desktop: '1800px',
} as const

export const radii = {
  sm: 'var(--nv-radius-sm)',
  md: 'var(--nv-radius-md)',
  lg: 'var(--nv-radius-lg)',
  xl: 'var(--nv-radius-xl)',
  full: 'var(--nv-radius-full)',
} as const

export const transitions = {
  fast: 'var(--nv-transition-fast)',
  normal: 'var(--nv-transition-normal)',
  smooth: 'var(--nv-transition-smooth)',
} as const

export const shadows = {
  brutalSm: 'var(--nv-shadow-brutal-sm)',
  brutalMd: 'var(--nv-shadow-brutal-md)',
  brutalLg: 'var(--nv-shadow-brutal-lg)',
  brutalCard: 'var(--nv-shadow-brutal-card)',
  brutalCardSm: 'var(--nv-shadow-brutal-card-sm)',
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
    // Brand / Accent
    accent: 'var(--nv-color-accent)',
    accentHover: 'var(--nv-color-accent-hover)',
    accentDark: 'var(--nv-color-accent-dark)',
    accentText: 'var(--nv-color-accent-text)',
    logo: 'var(--nv-color-logo)',
    ghostText: 'var(--nv-color-ghost-text)',
    ghostHoverBg: 'var(--nv-color-ghost-hover-bg)',
    ghostHoverText: 'var(--nv-color-ghost-hover-text)',

    // Container / Card
    container: 'var(--nv-color-container)',
    containerBorder: 'var(--nv-color-container-border)',
    containerShadow: 'var(--nv-color-container-shadow)',

    // Backgrounds
    bgPage: 'var(--nv-color-bg-page)',
    bgPanel: 'var(--nv-color-bg-panel)',
    bgSubtle: 'var(--nv-color-bg-subtle)',
    bgAlt: 'var(--nv-color-bg-alt)',
    bgMuted: 'var(--nv-color-bg-muted)',
    bgInput: 'var(--nv-color-bg-input)',

    // Typography
    textPrimary: 'var(--nv-color-text-primary)',
    textSecondary: 'var(--nv-color-text-secondary)',
    textMuted: 'var(--nv-color-text-muted)',
    textInverse: 'var(--nv-color-text-inverse)',

    // Borders
    borderStrong: 'var(--nv-color-border-strong)',
    borderSubtle: 'var(--nv-color-border-subtle)',
    borderInput: 'var(--nv-color-border-input)',
    borderCard: 'var(--nv-color-border-card)',

    // States & Alerts
    errorBg: 'var(--nv-color-error-bg)',
    errorBorder: 'var(--nv-color-error-border)',
    errorText: 'var(--nv-color-error-text)',

    danger: 'var(--nv-color-danger)',
    dangerHover: 'var(--nv-color-danger-hover)',

    successBg: 'var(--nv-color-success-bg)',
    successBorder: 'var(--nv-color-success-border)',
    successText: 'var(--nv-color-success-text)',

    noticeBg: 'var(--nv-color-notice-bg)',
    noticeBorder: 'var(--nv-color-notice-border)',
    noticeAccent: 'var(--nv-color-notice-accent)',
    noticeText: 'var(--nv-color-notice-text)',

    // Backdrop
    backdropText: 'var(--nv-color-backdrop-text)',
    backdropStroke: 'var(--nv-color-backdrop-stroke)',
  },
} as const

export const tokens = {
  breakpoints,
  radii,
  transitions,
  shadows,
  colors,
} as const

export type Tokens = typeof tokens
