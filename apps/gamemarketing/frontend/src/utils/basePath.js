export function getGamemarketingBasePath() {
	return window.gamemarketing_path || 'gamemarketing'
}

export function getGamemarketingRoute(path = '') {
	const base = getGamemarketingBasePath()
	if (!path) {
		return base
	}
	const normalized = path.startsWith('/') ? path.slice(1) : path
	return `/${base}/${normalized}`
}
