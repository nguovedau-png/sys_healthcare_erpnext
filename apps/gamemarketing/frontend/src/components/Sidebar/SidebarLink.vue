<template>
	<button
		v-if="link && !link.onlyMobile"
		class="group flex w-full cursor-pointer items-center rounded-md text-ink-gray-7 transition-all duration-200 ease-in-out focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-outline-gray-3"
		:class="[
			isActive 
				? 'bg-surface-gray-2 text-ink-gray-9 font-medium shadow-sm' 
				: 'hover:bg-surface-gray-1 hover:text-ink-gray-9',
			isCollapsed ? 'h-9 justify-center' : 'h-8 px-2'
		]"
		@click="handleClick"
		:title="isCollapsed ? __(link.label) : ''"
	>
		<!-- Icon -->
		<span class="grid h-5 w-5 flex-shrink-0 place-items-center">
			<component
				:is="icons[link.icon]"
				class="h-4.5 w-4.5 stroke-[1.5] transition-colors duration-200"
				:class="isActive ? 'text-ink-gray-9' : 'text-ink-gray-6 group-hover:text-ink-gray-8'"
			/>
		</span>
		
		<!-- Label -->
		<span
			v-if="!isCollapsed"
			class="ml-2.5 flex-shrink-0 text-sm transition-all duration-200 truncate"
			:class="isActive ? 'font-medium' : 'font-normal'"
		>
			{{ __(link.label) }}
		</span>
		
		<!-- Active Indicator (when collapsed) -->
		<div
			v-if="isCollapsed && isActive"
			class="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-blue-500"
		></div>
		
		<!-- Count Badge -->
		<span
			v-if="link.count && !isCollapsed"
			class="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-surface-blue-2 px-1.5 text-xs font-medium text-ink-blue-2"
		>
			{{ link.count > 99 ? '99+' : link.count }}
		</span>
	</button>
</template>
<script setup>
import { Tooltip } from 'frappe-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import * as icons from 'lucide-vue-next'

const router = useRouter()

const props = defineProps({
	link: {
		type: Object,
		required: true,
	},
	isCollapsed: {
		type: Boolean,
		default: false,
	},
})

function handleClick() {
	if (router.hasRoute(props.link.to)) {
		router.push({ name: props.link.to })
	} else if (props.link.to?.includes('@')) {
		// Handle email links if needed
	} else if (props.link.to) {
		if (props.link.to.startsWith('http')) {
			window.open(props.link.to, '_blank')
			return
		}
		window.location.href = `/${props.link.to}`
	}
}

const isActive = computed(() => {
	return props.link?.activeFor?.includes(router.currentRoute.value.name)
})
</script>
