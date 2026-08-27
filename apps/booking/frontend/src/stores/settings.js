import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createResource } from 'frappe-ui'

export const useSettings = defineStore('settings', () => {
	const isSettingsOpen = ref(false)
	const isCommandPaletteOpen = ref(false)
	const activeTab = ref(null)

	const settings = createResource({
		url: 'booking.booking.api.get_booking_settings',
		auto: true,
		cache: 'Booking Settings',
	})

	const sidebarSettings = createResource({
		url: 'booking.booking.api.get_sidebar_settings',
		cache: 'Sidebar Settings',
		auto: false,
	})

	return {
		activeTab,
		isSettingsOpen,
		isCommandPaletteOpen,
		settings,
		sidebarSettings,
	}
})
