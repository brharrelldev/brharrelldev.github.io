import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './content/**/*.md',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#000000',
        surface: '#111111',
        border:  '#222222',
        cyan: {
          DEFAULT: '#00E5FF',
          dim:     '#00B8CC',
          faint:   'rgba(0,229,255,0.10)',
        },
        text: {
          primary:   '#E8E8F0',
          secondary: '#C8C8E0',
          muted:     '#8A8AB0',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':            '#E8E8F0',
            '--tw-prose-headings':        '#E8E8F0',
            '--tw-prose-lead':            '#C8C8E0',
            '--tw-prose-links':           '#00E5FF',
            '--tw-prose-bold':            '#E8E8F0',
            '--tw-prose-counters':        '#00E5FF',
            '--tw-prose-bullets':         '#00E5FF',
            '--tw-prose-hr':              '#222222',
            '--tw-prose-quotes':          '#A0A0C0',
            '--tw-prose-quote-borders':   '#00E5FF',
            '--tw-prose-captions':        '#8A8AB0',
            '--tw-prose-code':            '#00E5FF',
            '--tw-prose-pre-code':        '#E8E8F0',
            '--tw-prose-pre-bg':          '#0A0A0A',
            '--tw-prose-th-borders':      '#222222',
            '--tw-prose-td-borders':      '#222222',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.8',
            'h1, h2, h3, h4': {
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            code: {
              fontFamily: "'JetBrains Mono', monospace",
              padding: '0.1em 0.3em',
              borderRadius: '0.2em',
              fontWeight: '400',
            },
            pre: { border: '1px solid #222222' },
            blockquote: { fontStyle: 'normal' },
            a: {
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
