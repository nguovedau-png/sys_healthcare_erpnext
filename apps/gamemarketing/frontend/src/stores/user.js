import { defineStore } from 'pinia'
import { createResource } from 'frappe-ui'

export const usersStore = defineStore('gamemarketing-users', () => {
	let userResource = createResource({
		url: 'gamemarketing.gamemarketing.api.get_user_info',
		onError(error) {
			if (error && error.exc_type === 'AuthenticationError') {
				window.location.href = '/login'
			}
		},
	})

	const allUsers = createResource({
		url: 'gamemarketing.gamemarketing.api.get_all_users',
		cache: ['allUsers'],
	})

	return {
		userResource,
		allUsers,
	}
})
