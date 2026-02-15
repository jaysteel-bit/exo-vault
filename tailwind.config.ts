import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                fontFamily: {
                        sans: ['Urbanist', 'Geist', 'Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        neutral: {
                                850: '#1f1f1f',
                                950: '#0a0a0a',
                        },
                        emerald: {
                                450: '#10b981',
                        },
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                animation: {
                        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
                        'slide-up': 'slideUp 0.8s ease-out forwards',
                        'fade-in': 'fadeIn 0.5s ease-out forwards',
                        'scale-in': 'scaleIn 0.3s ease-out forwards',
                        'shimmer': 'shimmer 3s infinite',
                },
                keyframes: {
                        fadeInDown: {
                                '0%': { opacity: '0', transform: 'translateY(-20px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        slideUp: {
                                '0%': { opacity: '0', transform: 'translateY(20px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' },
                        },
                        scaleIn: {
                                '0%': { opacity: '0', transform: 'scale(0.95)' },
                                '100%': { opacity: '1', transform: 'scale(1)' },
                        },
                        shimmer: {
                                '0%': { backgroundPosition: '200% 0' },
                                '100%': { backgroundPosition: '-200% 0' },
                        },
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
