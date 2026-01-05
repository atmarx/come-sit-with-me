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
				// Warm amber for Symptoms (body awareness)
				amber: {
					50: '#fffbf5',
					100: '#fef3e2',
					200: '#fde4c4',
					300: '#f9d19f',
					400: '#f4b86d',
					500: '#e9a654',
					600: '#d4883a',
					700: '#b06a2e',
					800: '#8f552b',
					900: '#754726',
					950: '#3f2312'
				},
				// Soft teal for Considerations (thoughtful, calm)
				teal: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#9ef5e4',
					300: '#6ae8d4',
					400: '#3dd4be',
					500: '#22b8a5',
					600: '#189486',
					700: '#18766c',
					800: '#185e57',
					900: '#184e49',
					950: '#082f2c'
				},
				// Warm coral for Partners (connection, warmth)
				coral: {
					50: '#fef5f2',
					100: '#fee8e2',
					200: '#fdd5ca',
					300: '#fbb8a5',
					400: '#f79072',
					500: '#ed6d4a',
					600: '#da5130',
					700: '#b74025',
					800: '#973823',
					900: '#7d3323',
					950: '#44170e'
				},
				// Soft lavender for Finding Care (seeking, navigation)
				lavender: {
					50: '#f8f7fc',
					100: '#f1eef9',
					200: '#e5e0f4',
					300: '#d2c8eb',
					400: '#b9a7de',
					500: '#a088cf',
					600: '#8b6abc',
					700: '#7756a3',
					800: '#634887',
					900: '#533d6f',
					950: '#35254a'
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
