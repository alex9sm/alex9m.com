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
	/** Card thumbnail, served from static/ (reuses an image from the writeup). */
	image?: string;
};

export const PROJECTS: Project[] = [
	{
		href: '/cs2-esp',
		image: '/cs2-esp/1.jpg',
		title: 'CS2 Kernel Driver',
		description: 'A CS2 kernel driver cheat built off of an external esp I made when I was 14',
		tags: ['C++', 'Windows API', 'Reverse Engineering', 'ImGui'],
		status: '9/26',
		repo: 'https://github.com/alex9sm/kd-external'
	},
	{
		href: '/stats-server',
		image: '/stats-server/1.jpg',
		title: 'Stats Server',
		description: 'A metrics daemon for Proxmox nodes that feeds Grafana over HTTP.',
		tags: ['C++', 'Linux', 'HTTP', 'Grafana'],
		status: '8/26',
		repo: 'https://github.com/alex9sm/stats-server'
	},
	{
		href: '/vulkan',
		image: '/vulkan/1.jpg',
		title: 'Vulkan Renderer',
		description: 'Real-time renderer built from the ground up on the VulkanSDK.',
		tags: ['C++', 'Vulkan', 'GLSL'],
		status: '12/25'
	},
	{
		href: '/tradingbot',
		image: '/tradingbot/1.jpg',
		title: 'Arbitrage Trading Bot',
		description: 'This project made me a lot of money while it was active.',
		tags: ['Python', 'OpenAI', 'Discord API', 'Brokerage APIs'],
		status: '7/24'
	}
];
