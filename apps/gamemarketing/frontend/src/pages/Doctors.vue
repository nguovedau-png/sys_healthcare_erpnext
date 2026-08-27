<template>
	<div class="w-full px-5 pt-5 pb-10">
		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-xl font-bold text-ink-gray-9">
				{{ __('Available Doctors') }}
			</h1>
			<p class="mt-1 text-sm text-ink-gray-6">
				{{ __('Browse and book appointments with our expert doctors') }}
			</p>
		</div>

		<!-- Loading State -->
		<div v-if="doctors.loading" class="flex items-center justify-center py-12">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
		</div>

		<!-- Doctors Grid -->
		<div
			v-else-if="doctors.data && doctors.data.length > 0"
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
		>
			<div
				v-for="doctor in doctors.data"
				:key="doctor.name"
				class="group bg-surface-white rounded-md border border-outline-gray-2 p-6 hover:border-outline-gray-3 transition-all duration-300 hover:shadow-md cursor-pointer"
				@click="$router.push(`/doctors/${doctor.name}`)"
			>
				<div class="flex items-start justify-between mb-4">
					<div class="flex-1">
						<h3
							class="text-base font-semibold text-ink-gray-9 group-hover:text-ink-blue-2 transition-colors"
						>
							{{ doctor.doctor_name }}
						</h3>
						<p class="mt-1 text-sm text-ink-gray-6">
							{{ doctor.specialization }}
						</p>
					</div>
					<ChevronRight
						class="w-5 h-5 text-ink-gray-4 group-hover:text-ink-blue-2 group-hover:translate-x-1 transition-all"
					/>
				</div>

				<div class="space-y-2 mb-4">
					<div class="flex items-center text-sm text-ink-gray-7">
						<Briefcase class="w-4 h-4 mr-2 text-ink-gray-5" />
						<span>{{ doctor.experience_years }} years experience</span>
					</div>
					<div class="flex items-center text-sm text-ink-gray-7">
						<DollarSign class="w-4 h-4 mr-2 text-ink-gray-5" />
						<span>${{ doctor.consultation_fee }}/consultation</span>
					</div>
				</div>

				<Button
					variant="subtle"
					theme="blue"
					class="w-full"
					@click.stop="$router.push(`/doctors/${doctor.name}`)"
				>
					{{ __('View Details & Book') }}
				</Button>
			</div>
		</div>

		<!-- Empty State -->
		<div v-else class="text-center py-12">
			<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-menu-bar mb-4">
				<UserX class="w-8 h-8 text-ink-gray-4" />
			</div>
			<h3 class="text-base font-semibold text-ink-gray-9 mb-2">
				{{ __('No doctors available') }}
			</h3>
			<p class="text-sm text-ink-gray-6">
				{{ __('Please check back later or contact support') }}
			</p>
		</div>
	</div>
</template>

<script setup>
import { createResource, usePageMeta, Button } from 'frappe-ui'
import {
	ChevronRight,
	Briefcase,
	DollarSign,
	UserX,
} from 'lucide-vue-next'

const doctors = createResource({
	url: 'gamemarketing.gamemarketing.api.get_doctors',
	auto: true,
})

usePageMeta(() => {
	return {
		title: 'Doctors',
	}
})
</script>
