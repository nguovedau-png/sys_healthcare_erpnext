import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createResource } from 'frappe-ui'

export const useSettings = defineStore('settings', () => {
	const isSettingsOpen = ref(false)
	const isCommandPaletteOpen = ref(false)
	const activeTab = ref(null)

	const settings = createResource({
		url: 'gamemarketing.gamemarketing.api.get_gamemarketing_settings',
		auto: true,
		cache: 'Gamemarketing Settings',
	})

	const sidebarSettings = createResource({
		url: 'gamemarketing.gamemarketing.api.get_sidebar_settings',
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
