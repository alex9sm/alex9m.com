// Single source of truth for the project list. The home page renders these as
// cards and the TopBar uses the paths to light up the "Projects" tab while a
// writeup is open, so adding a project here is all it takes for both to update.

export type Project = {
	href: string;
	title: string;
	description: string;
	tags: string[];
	status?: string;
	/** Public repo, shown as a GitHub icon on the card. Omit for private work. */
	repo?: string;
};

export const PROJECTS: Project[] = [
	{
		href: '/stats-server',
		title: 'Stats Server',
		description: 'A metrics daemon for Proxmox nodes that feeds Grafana over HTTP.',
		tags: ['C++', 'Linux', 'HTTP', 'Grafana'],
		status: 'Writeup',
		repo: 'https://github.com/alex9sm/stats-server'
	},
	{
		href: '/tradingbot',
		title: 'Arbitrage Trading Bot',
		description: 'This project made me a lot of money while it was active.',
		tags: ['Python', 'OpenAI', 'Discord API', 'Brokerage APIs'],
		status: 'Writeup'
	},
	{
		href: '/vulkan',
		title: 'Vulkan Renderer',
		description: 'Real-time renderer built from the ground up on the VulkanSDK.',
		tags: ['C++', 'Vulkan', 'GLSL'],
		status: 'Writeup'
	},
	{
		href: '/cs2-esp',
		title: 'CS2 External ESP',
		description: 'An old CS:GO cheat I wrote when I was 14, updated for CS2',
		tags: ['C++', 'Windows API', 'Reverse Engineering', 'ImGui'],
		status: 'Writeup',
		repo: 'https://github.com/alex9sm/cs2-external'
	}
];
