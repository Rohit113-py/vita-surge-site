import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				glass: {
					bg: 'hsl(var(--glass-bg))',
					border: 'hsl(var(--glass-border))',
					glow: 'hsl(var(--glass-glow))'
				},
				chart: {
					primary: 'hsl(var(--chart-primary))',
					secondary: 'hsl(var(--chart-secondary))',
					accent: 'hsl(var(--chart-accent))',
					warning: 'hsl(var(--chart-warning))',
					success: 'hsl(var(--chart-success))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				glass: '1.5rem'
			},
			backdropBlur: {
				glass: 'var(--blur)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-mesh': 'var(--gradient-mesh)'
			},
			boxShadow: {
				'glow-primary': '0 0 30px hsla(var(--primary), 0.5)',
				'glow-secondary': '0 0 30px hsla(var(--secondary), 0.5)',
				'glass': '0 8px 32px hsla(0, 0%, 0%, 0.37)',
				'medical': '0 25px 50px -12px hsla(var(--primary), 0.25)'
			},
			transitionTimingFunction: {
				'medical': 'var(--ease-medical)',
				'bounce': 'var(--ease-bounce)'
			},
			keyframes: {
				'dna-spin': {
					'0%': { 
						transform: 'rotate(0deg) rotateY(0deg)' 
					},
					'100%': { 
						transform: 'rotate(360deg) rotateY(360deg)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg)' 
					},
					'50%': { 
						transform: 'translateY(-20px) rotate(5deg)' 
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsla(var(--primary), 0.3)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsla(var(--primary), 0.8)' 
					}
				},
				'heartbeat': {
					'0%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.3)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.3)' },
					'70%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1)' }
				},
				'data-flow': {
					'0%': { 
						transform: 'translateX(-100%)' 
					},
					'100%': { 
						transform: 'translateX(100vw)' 
					}
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'dna-spin': 'dna-spin 8s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'heartbeat': 'heartbeat 2s ease-in-out infinite',
				'data-flow': 'data-flow 3s linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
