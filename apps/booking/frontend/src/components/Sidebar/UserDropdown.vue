<template>
	<div class="p-3">
		<Dropdown :options="userDropdownOptions">
			<template v-slot="{ open, close }">
				<button
					class="flex h-14 items-center rounded-lg duration-200 ease-in-out border transition-all"
					:class="
						isCollapsed
							? 'px-1 w-auto justify-center bg-surface-gray-7 border-outline-gray-4 shadow-sm'
							: open
							? 'bg-surface-gray-7 shadow-md border-outline-gray-5 px-3 w-full'
							: 'bg-surface-gray-7 border-outline-gray-4 px-3 w-full hover:border-outline-gray-5 hover:shadow-md'
					"
				>
					<UserAvatar
						:image="userResource.data?.user_image"
						:name="userResource.data?.full_name"
						size="sm"
						class="w-9 h-9 rounded-lg flex-shrink-0 ring-2 ring-outline-gray-3 shadow-sm"
					/>
					<div
						class="flex flex-1 flex-col text-left duration-200 ease-in-out overflow-hidden"
						:class="
							isCollapsed
								? 'opacity-0 ml-0 w-0'
								: 'opacity-100 ml-3 w-auto'
						"
					>
						<div class="text-sm font-semibold text-ink-white leading-tight">
							{{ branding.data?.app_name || 'Booking' }}
						</div>
						<div
							v-if="userResource.data"
							class="mt-0.5 text-xs text-ink-gray-3 leading-tight truncate max-w-[180px]"
						>
							{{ userResource.data?.full_name }}
						</div>
					</div>
					<div
						class="duration-200 ease-in-out"
						:class="
							isCollapsed
								? 'opacity-0 ml-0 w-0'
								: 'opacity-100 ml-2 w-auto'
						"
					>
						<ChevronDown 
							class="h-4 w-4 text-ink-gray-3 transition-transform duration-200"
							:class="open ? 'rotate-180' : ''"
						/>
					</div>
				</button>
			</template>
		</Dropdown>
	</div>
</template>

<script setup>
import { sessionStore } from '@/stores/session'
import { Dropdown } from 'frappe-ui'
import { useRouter } from 'vue-router'
import { usersStore } from '@/stores/user'
import { ref, onMounted, computed } from 'vue'
import UserAvatar from '../UserAvatar.vue'
import {
	ChevronDown,
	LogIn,
	LogOut,
	Moon,
	User,
	Sun,
} from 'lucide-vue-next'

const router = useRouter()
const { logout, branding } = sessionStore()
let { userResource } = usersStore()
let { isLoggedIn } = sessionStore()
const theme = ref('light')

const props = defineProps({
	isCollapsed: {
		type: Boolean,
		default: false,
	},
})

onMounted(() => {
	theme.value = localStorage.getItem('theme') || 'light'
	if (['light', 'dark'].includes(theme.value)) {
		document.documentElement.setAttribute('data-theme', theme.value)
	}
})

const toggleTheme = () => {
	const currentTheme = document.documentElement.getAttribute('data-theme')
	theme.value = currentTheme === 'dark' ? 'light' : 'dark'
	document.documentElement.setAttribute('data-theme', theme.value)
	localStorage.setItem('theme', theme.value)
}

const userDropdownOptions = computed(() => {
	return [
		{
			group: '',
			items: [
				{
					icon: User,
					label: 'My Profile',
					onClick: () => {
						router.push(`/user/${userResource.data?.username}`)
					},
					condition: () => {
						return isLoggedIn
					},
				},
				{
					icon: theme.value === 'light' ? Moon : Sun,
					label: 'Toggle Theme',
					onClick: () => {
						toggleTheme()
					},
				},
				{
					icon: LogOut,
					label: 'Log out',
					onClick: () => {
						logout.submit().then(() => {
							isLoggedIn = false
						})
					},
					condition: () => {
						return isLoggedIn
					},
				},
				{
					icon: LogIn,
					label: 'Log in',
					onClick: () => {
						window.location.href = '/login'
					},
					condition: () => {
						return !isLoggedIn
					},
				},
			],
		},
	]
})
</script>
