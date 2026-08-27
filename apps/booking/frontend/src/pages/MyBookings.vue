<template>
	<div class="w-full px-5 pt-5 pb-10">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h1 class="text-xl font-bold text-ink-gray-9">
					{{ __('My Bookings') }}
				</h1>
				<p class="mt-1 text-sm text-ink-gray-6">
					{{ __('View and manage your appointments') }}
				</p>
			</div>
			<Button
				variant="solid"
				theme="blue"
				@click="$router.push('/doctors')"
			>
				<template #prefix>
					<Plus class="w-4 h-4" />
				</template>
				{{ __('New Booking') }}
			</Button>
		</div>

		<!-- Loading State -->
		<div v-if="bookings.loading" class="flex items-center justify-center py-12">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
		</div>

		<!-- Bookings List -->
		<div
			v-else-if="bookings.data && bookings.data.length > 0"
			class="space-y-4"
		>
			<div
				v-for="booking in bookings.data"
				:key="booking.name"
				class="bg-surface-white rounded-md border border-outline-gray-2 p-6 hover:border-outline-gray-3 transition-all duration-300"
			>
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<div class="flex items-center space-x-3 mb-3">
							<div
								class="w-10 h-10 rounded-full bg-surface-blue-2 flex items-center justify-center"
							>
								<User class="w-5 h-5 text-ink-blue-2" />
							</div>
							<div>
								<h3 class="text-base font-semibold text-ink-gray-9">
									{{ booking.doctor_name }}
								</h3>
								<p class="text-xs text-ink-gray-5">
									{{ booking.doctor }}
								</p>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4 mt-4">
							<div class="flex items-center text-sm text-ink-gray-7">
								<Calendar class="w-4 h-4 mr-2 text-ink-gray-5" />
								<span>{{ booking.booking_date }}</span>
							</div>
							<div class="flex items-center text-sm text-ink-gray-7">
								<Clock class="w-4 h-4 mr-2 text-ink-gray-5" />
								<span>{{ booking.booking_time }}</span>
							</div>
						</div>

						<p
							v-if="booking.notes"
							class="mt-3 text-sm text-ink-gray-6 bg-surface-menu-bar rounded p-3"
						>
							<strong>{{ __('Notes:') }}</strong> {{ booking.notes }}
						</p>
					</div>

					<!-- Status Badge -->
					<Badge
						:label="booking.status"
						:theme="getStatusTheme(booking.status)"
						variant="subtle"
					/>
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div v-else class="text-center py-12">
			<div
				class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-menu-bar mb-4"
			>
				<CalendarX class="w-8 h-8 text-ink-gray-4" />
			</div>
			<h3 class="text-base font-semibold text-ink-gray-9 mb-2">
				{{ __('No bookings yet') }}
			</h3>
			<p class="text-sm text-ink-gray-6 mb-4">
				{{ __('Start by browsing our available doctors') }}
			</p>
			<Button variant="solid" theme="blue" @click="$router.push('/doctors')">
				<template #prefix>
					<Stethoscope class="w-4 h-4" />
				</template>
				{{ __('Browse Doctors') }}
			</Button>
		</div>
	</div>
</template>

<script setup>
import {
	createResource,
	usePageMeta,
	Button,
	Badge,
} from 'frappe-ui'
import {
	Plus,
	User,
	Calendar,
	Clock,
	CalendarX,
	Stethoscope,
} from 'lucide-vue-next'

const bookings = createResource({
	url: 'booking.booking.api.get_my_bookings',
	auto: true,
})

const getStatusTheme = (status) => {
	const themes = {
		Confirmed: 'green',
		Pending: 'amber',
		Cancelled: 'red',
		Completed: 'blue',
	}
	return themes[status] || 'gray'
}

usePageMeta(() => {
	return {
		title: 'My Bookings',
	}
})
</script>
