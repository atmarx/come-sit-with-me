/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {
			colors: {
				// Warm & Approachable palette
				primary: {
					50: '#fdf5f5',
					100: '#fae8e8',
					200: '#f5d4d4',
					300: '#e8b8b8',
					400: '#d49a9a',
					500: '#c4a4a4', // Main dusty rose
					600: '#a87878',
					700: '#8c5f5f',
					800: '#755050',
					900: '#634646',
					950: '#352323'
				},
				secondary: {
					50: '#f5fdf5',
					100: '#e8fae8',
					200: '#d4f5d4',
					300: '#b8e8b8',
					400: '#9ad49a',
					500: '#a4c4a4', // Main sage green
					600: '#78a878',
					700: '#5f8c5f',
					800: '#507550',
					900: '#466346',
					950: '#233523'
				},
				cream: '#FDF8F5',
				surface: '#FFFFFF',
				text: {
					DEFAULT: '#3D3836',
					muted: '#6B6462'
				}
			},
			fontFamily: {
				serif: ['Lora', 'Georgia', 'serif'],
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.text.DEFAULT'),
						'--tw-prose-headings': theme('colors.text.DEFAULT'),
						'--tw-prose-links': theme('colors.primary.600'),
						'--tw-prose-bold': theme('colors.text.DEFAULT'),
						'--tw-prose-counters': theme('colors.text.muted'),
						'--tw-prose-bullets': theme('colors.primary.400'),
						'--tw-prose-hr': theme('colors.primary.200'),
						'--tw-prose-quotes': theme('colors.text.DEFAULT'),
						'--tw-prose-quote-borders': theme('colors.primary.300'),
						'--tw-prose-captions': theme('colors.text.muted'),
						'--tw-prose-th-borders': theme('colors.primary.200'),
						'--tw-prose-td-borders': theme('colors.primary.100'),
						maxWidth: 'none',
						h1: {
							fontFamily: theme('fontFamily.serif').join(', '),
							fontWeight: '600'
						},
						h2: {
							fontFamily: theme('fontFamily.serif').join(', '),
							fontWeight: '600'
						},
						h3: {
							fontFamily: theme('fontFamily.serif').join(', '),
							fontWeight: '500'
						},
						a: {
							textDecoration: 'none',
							borderBottom: `1px solid ${theme('colors.primary.300')}`,
							'&:hover': {
								borderBottomColor: theme('colors.primary.500')
							}
						},
						'code::before': {
							content: '""'
						},
						'code::after': {
							content: '""'
						}
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
