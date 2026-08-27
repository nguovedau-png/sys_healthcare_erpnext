<template>
	<div
		class="flex h-full flex-col justify-between transition-all duration-300 ease-in-out border-r bg-surface-menu-bar shadow-sm"
		:class="sidebarStore.isSidebarCollapsed ? 'w-14' : 'w-56'"
	>
		<div
			class="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-outline-gray-2 scrollbar-track-transparent"
			:class="sidebarStore.isSidebarCollapsed ? 'items-center' : ''"
		>
			<UserDropdown :isCollapsed="sidebarStore.isSidebarCollapsed" />
			
			<!-- Navigation Section -->
			<div class="flex flex-col overflow-y-auto px-2 py-3" v-if="sidebarSettings.data">
				<div v-for="(link, index) in sidebarLinks" :key="index" class="mb-1">
					<nav class="space-y-0.5">
						<div v-for="(item, itemIndex) in link.items" :key="itemIndex">
							<SidebarLink
								:link="item"
								:isCollapsed="sidebarStore.isSidebarCollapsed"
							/>
						</div>
					</nav>
					<!-- Divider between sections if multiple -->
					<div 
						v-if="index < sidebarLinks.length - 1"
						class="my-2 border-t border-outline-gray-1"
					></div>
				</div>
			</div>
		</div>
		
		<!-- Footer Section -->
		<div class="p-2 border-t border-outline-gray-1">
			<div
				class="flex items-center"
				:class="
					sidebarStore.isSidebarCollapsed ? 'flex-col space-y-2' : 'flex-row justify-between'
				"
			>
				<!-- App Info (when expanded) -->
				<div 
					v-if="!sidebarStore.isSidebarCollapsed"
					class="flex items-center gap-2 text-xs text-ink-gray-5"
				>
					<span class="font-medium">Booking</span>
					<span class="text-outline-gray-3">•</span>
					<span>v1.0</span>
				</div>
				
				<!-- Collapse Button -->
				<Tooltip
					:text="
						sidebarStore.isSidebarCollapsed ? __('Expand Sidebar') : __('Collapse Sidebar')
					"
				>
					<button
						@click="toggleSidebar()"
						class="flex items-center justify-center p-1.5 rounded-md hover:bg-surface-gray-2 transition-all duration-200 group"
						:class="sidebarStore.isSidebarCollapsed ? 'w-full' : ''"
					>
						<CollapseSidebar
							class="size-4 text-ink-gray-6 duration-300 stroke-1.5 ease-in-out group-hover:text-ink-gray-9"
							:class="{
								'[transform:rotateY(180deg)]': sidebarStore.isSidebarCollapsed,
							}"
						/>
					</button>
				</Tooltip>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSettings } from '@/stores/settings'
import { useSidebar } from '@/stores/sidebar'
import { Tooltip } from 'frappe-ui'
import UserDropdown from './UserDropdown.vue'
import SidebarLink from './SidebarLink.vue'
import CollapseSidebar from '../Icons/CollapseSidebar.vue'

const { sidebarSettings } = useSettings()
const sidebarStore = useSidebar()

const sidebarLinks = ref([
	{
		items: [
			{
				label: 'Home',
				icon: 'Home',
				to: 'Home',
				activeFor: ['Home'],
			},
			{
				label: 'Doctors',
				icon: 'Stethoscope',
				to: 'Doctors',
				activeFor: ['Doctors', 'DoctorDetail'],
			},
			{
				label: 'My Bookings',
				icon: 'Calendar',
				to: 'MyBookings',
				activeFor: ['MyBookings'],
			},
		],
	},
])

const toggleSidebar = () => {
	sidebarStore.isSidebarCollapsed = !sidebarStore.isSidebarCollapsed
	localStorage.setItem(
		'isSidebarCollapsed',
		JSON.stringify(sidebarStore.isSidebarCollapsed)
	)
}

onMounted(() => {
	sidebarSettings.reload()
})
</script>
