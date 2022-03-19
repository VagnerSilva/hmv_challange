module.exports = {
	content: ['./apps/hmv-fiap/src/**/*.{html,ts,scss}'],
	theme: {
		extend: {
			colors: {
				primary: {
					dark: 'var(--primary-dark)',
					pure: 'var(--primary-pure)',
					light: 'var(--primary-light)',
					lighter: 'var(--primary-lighter)',
					lightest: 'var(--primary-lightest)',
				},
				sucess: {
					dark: 'var(--sucess-dark)',
					pure: 'var(--sucess-pure)',
					light: 'var(--sucess-light)',
				},
				info: {
					dark: 'var(--info-dark)',
					pure: 'var(--info-pure)',
					light: 'var(--info-light)',
				},
				warn: {
					dark: 'var(--warn-dark)',
					pure: 'var(--warn-pure)',
					light: 'var(--warn-light)',
				},
				error: {
					dark: 'var(--error-dark)',
					pure: 'var(--error-pure)',
					light: 'var(--error-light)',
				},
				gray: {
					900: 'var(--gray-900)',
					600: 'var(--gray-600)',
					300: 'var(--gray-300)',
					100: 'var(--gray-100)',
					50: 'var(--gray-50)',
				},
			},
		},
		screens: {
			tbt: '640px',
			// => @media (min-width: 640px) { ... }

			lap: '1024px',
			// => @media (min-width: 1024px) { ... }

			desk: '1280px',
			// => @media (min-width: 1280px) { ... }
		},
		fontFamily: {
			sans: ['Helvetica', 'sans-serif'],
		},
	},
	plugins: [],
}
