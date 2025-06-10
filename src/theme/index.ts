export const theme = {
  colors: {
    // Brand colors
    primary: {
      main: '#0b79ee',
      hover: '#096ed8',
      light: '#dce7f3',
    },
    // Background colors
    background: {
      main: 'rgb(40, 48, 57))',
      secondary: '#1b2127',
      tertiary: '#283039',
      hover: '#3b4754',
    },
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#90abcb',
      dark: '#121416',
    },
    // Border colors
    border: {
      main: '#283039',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
    heading: {
      h1: 'text-[32px] font-bold leading-tight tracking-[-0.015em]',
      h2: 'text-[28px] font-bold leading-tight',
      h3: 'text-[22px] font-bold leading-tight tracking-[-0.015em]',
      h4: 'text-lg font-bold leading-tight tracking-[-0.015em]',
    },
    body: {
      large: 'text-base font-normal leading-normal',
      default: 'text-sm font-normal leading-normal',
      small: 'text-xs font-normal leading-normal',
    },
    button: {
      large: 'text-base font-bold leading-normal',
      default: 'text-sm font-bold leading-normal',
      small: 'text-xs font-bold leading-normal',
    },
  },
  spacing: {
    container: {
      max: 'max-w-[1200px]',
      default: 'px-6',
      wide: 'px-10',
    },
    padding: {
      page: 'p-4',
      section: 'p-6',
      card: 'p-4',
    },
    gap: {
      small: 'gap-2',
      default: 'gap-4',
      large: 'gap-6',
    },
  },
  components: {
    card: {
      base: 'rounded-xl bg-[#28405a] shadow-[0_4px_24px_rgba(0,0,0,0.18)] border border-[#223449]',
    },
    input: {
      base: 'w-full h-12 px-4 rounded-xl bg-[#1b2127] border border-[#283039] text-white text-base font-normal leading-normal focus:outline-none focus:border-[#0b79ee] transition-colors',
      label: 'block text-sm font-medium text-[#9caaba] mb-2',
    },
    button: {
      base: 'inline-flex items-center justify-center font-bold transition-colors rounded-xl',
      variants: {
        primary: 'bg-[#0b79ee] hover:bg-[#0b79ee]/90 text-white',
        secondary: 'bg-[#283039] hover:bg-[#3b4754] text-white',
      },
      sizes: {
        sm: 'px-4 h-8 text-sm',
        md: 'px-6 h-10 text-sm',
        lg: 'px-8 h-12 text-base',
      },
    },
  },
  layout: {
    sidebar: {
      width: 'w-64',
      background: 'bg-[rgb(34,52,73)]',
      border: 'border-r border-[#283039]',
    },
    header: {
      height: 'h-16',
      border: 'border-b border-[#283039]',
      padding: 'px-10 py-3',
    },
  },
} as const;

// Type for the theme
export type Theme = typeof theme;

// Helper function to get theme values with TypeScript support
export const getThemeValue = <
  T extends keyof Theme,
  K extends keyof Theme[T] = keyof Theme[T],
  V extends keyof Theme[T][K] = keyof Theme[T][K]
>(
  category: T,
  subcategory?: K,
  value?: V
): string => {
  if (!subcategory) {
    return theme[category] as unknown as string;
  }
  if (!value) {
    return theme[category][subcategory] as unknown as string;
  }
  return theme[category][subcategory][value] as unknown as string;
};

// CSS class helper functions
export const getTextStyle = (variant: keyof typeof theme.typography.heading | keyof typeof theme.typography.body) => {
  if (variant in theme.typography.heading) {
    return theme.typography.heading[variant as keyof typeof theme.typography.heading];
  }
  return theme.typography.body[variant as keyof typeof theme.typography.body];
};

export const getButtonStyle = (variant: keyof typeof theme.components.button.variants = 'primary', size: keyof typeof theme.components.button.sizes = 'md') => {
  return `${theme.components.button.base} ${theme.components.button.variants[variant]} ${theme.components.button.sizes[size]}`;
};

export const getInputStyle = () => {
  return theme.components.input.base;
};

export const getLabelStyle = () => {
  return theme.components.input.label;
}; 