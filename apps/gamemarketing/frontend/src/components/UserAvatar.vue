<template>
	<Avatar
		class="avatar border border-outline-gray-2 cursor-auto"
		v-if="user"
		:label="user.full_name"
		:image="user.user_image"
		:size="size"
		v-bind="$attrs"
	>
	</Avatar>
</template>
<script setup>
import { Avatar } from 'frappe-ui'
import { computed } from 'vue'

const props = defineProps({
	user: {
		type: Object,
		default: null,
	},
	size: {
		type: String,
	},
})
</script>
