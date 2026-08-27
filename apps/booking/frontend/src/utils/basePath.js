export function getBookingBasePath() {
	return window.booking_path || 'booking'
}

export function getBookingRoute(path = '') {
	const base = getBookingBasePath()
	if (!path) {
		return base
	}
	const normalized = path.startsWith('/') ? path.slice(1) : path
	return `/${base}/${normalized}`
}
