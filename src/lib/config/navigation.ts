export interface NavItem {
	title: string;
	href: string;
	children?: NavItem[];
}

export const navigation: NavItem[] = [
	{
		title: 'Introduction',
		href: '/'
	},
	{
		title: "What's Actually Happening",
		href: '/whats-happening',
		children: [
			{ title: 'The Hormonal Landscape', href: '/whats-happening/hormonal-landscape' },
			{ title: 'What Your Brain Is Doing', href: '/whats-happening/brain' },
			{ title: 'Your Whole Body', href: '/whats-happening/whole-body' }
		]
	},
	{
		title: 'Symptoms',
		href: '/symptoms',
		children: [
			{ title: 'Hot Flashes & Night Sweats', href: '/symptoms/hot-flashes' },
			{ title: 'When Sleep Won\'t Come', href: '/symptoms/sleep-wont-come' },
			{ title: 'Mood Changes', href: '/symptoms/mood' },
			{ title: 'Brain Fog & Memory', href: '/symptoms/brain-fog' },
			{ title: 'Sexual Desire & Libido', href: '/symptoms/libido' },
			{ title: 'Skin & Hair Changes', href: '/symptoms/skin' },
			{ title: 'Aches & Joint Pain', href: '/symptoms/aches' },
			{ title: 'Dryness & Discomfort', href: '/symptoms/dryness' },
			{ title: 'Menstrual Changes', href: '/symptoms/menstrual' }
		]
	},
	{
		title: 'Support & Options',
		href: '/support',
		children: [
			{ title: 'Hormone Approaches', href: '/support/hormone-therapy' },
			{ title: 'Beyond Hormones', href: '/support/beyond-hormones' },
			{ title: 'Herbal & Traditional', href: '/support/herbal-traditional' },
			{ title: 'Mind-Body Practices', href: '/support/mind-body' },
			{ title: 'Lifestyle & Self-Care', href: '/support/lifestyle' }
		]
	},
	{
		title: 'Special Considerations',
		href: '/considerations',
		children: [
			{ title: 'Contraception', href: '/considerations/contraception' },
			{ title: 'Cancer History', href: '/considerations/cancer-history' },
			{ title: 'Surgical Menopause', href: '/considerations/surgical-menopause' },
			{ title: 'Neurodivergence', href: '/considerations/neurodivergence' }
		]
	},
	{
		title: 'For Partners',
		href: '/for-partners'
	},
	{
		title: 'Finding Care',
		href: '/finding-care'
	},
	{
		title: 'Resources',
		href: '/resources'
	}
];
