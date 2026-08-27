<template>
	<div class="w-full px-5 pt-5 pb-10">
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<div class="text-xl font-bold text-ink-gray-9">
					{{ __('Welcome to Gamemarketing System') }} 👋
				</div>
			</div>

			<div class="text-lg text-ink-gray-6 leading-6">
				{{ __('Book appointments with our expert doctors') }}
			</div>
		</div>

		<div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- Browse Doctors Card -->
			<router-link
				to="/doctors"
				class="group bg-surface-white rounded-md border border-outline-gray-2 p-6 hover:border-outline-gray-3 transition-all duration-300 hover:shadow-md cursor-pointer"
			>
				<div class="flex items-start space-x-4">
					<div
						class="flex-shrink-0 w-12 h-12 rounded-md bg-surface-blue-2 flex items-center justify-center"
					>
						<Stethoscope class="w-6 h-6 text-ink-blue-2" />
					</div>
					<div class="flex-1">
						<h3
							class="text-base font-semibold text-ink-gray-9 group-hover:text-ink-blue-2 transition-colors"
						>
							{{ __('Browse Doctors') }}
						</h3>
						<p class="mt-1 text-sm text-ink-gray-6">
							{{
								__(
									'View all available doctors and book appointments'
								)
							}}
						</p>
					</div>
					<ChevronRight
						class="w-5 h-5 text-ink-gray-4 group-hover:text-ink-blue-2 group-hover:translate-x-1 transition-all"
					/>
				</div>
			</router-link>

			<!-- My Gamemarketings Card -->
			<router-link
				v-if="isLoggedIn"
				to="/my-gamemarketings"
				class="group bg-surface-white rounded-md border border-outline-gray-2 p-6 hover:border-outline-gray-3 transition-all duration-300 hover:shadow-md cursor-pointer"
			>
				<div class="flex items-start space-x-4">
					<div
						class="flex-shrink-0 w-12 h-12 rounded-md bg-surface-green-2 flex items-center justify-center"
					>
						<Calendar class="w-6 h-6 text-ink-green-2" />
					</div>
					<div class="flex-1">
						<h3
							class="text-base font-semibold text-ink-gray-9 group-hover:text-ink-green-2 transition-colors"
						>
							{{ __('My Gamemarketings') }}
						</h3>
						<p class="mt-1 text-sm text-ink-gray-6">
							{{ __('View and manage your appointments') }}
						</p>
					</div>
					<ChevronRight
						class="w-5 h-5 text-ink-gray-4 group-hover:text-ink-green-2 group-hover:translate-x-1 transition-all"
					/>
				</div>
			</router-link>

			<!-- Quick Stats (if logged in) -->
			<div
				v-if="isLoggedIn && upcomingGamemarketings.data"
				class="bg-surface-white rounded-md border border-outline-gray-2 p-6"
			>
				<div class="flex items-start space-x-4">
					<div
						class="flex-shrink-0 w-12 h-12 rounded-md bg-surface-amber-2 flex items-center justify-center"
					>
						<Clock class="w-6 h-6 text-ink-amber-2" />
					</div>
					<div class="flex-1">
						<h3 class="text-base font-semibold text-ink-gray-9">
							{{ __('Upcoming Appointments') }}
						</h3>
						<p class="mt-1 text-2xl font-bold text-ink-gray-9">
							{{ upcomingGamemarketings.data.length || 0 }}
						</p>
						<p class="text-xs text-ink-gray-5 mt-1">
							{{ __('Scheduled appointments') }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Login Prompt for Guests -->
		<div
			v-if="!isLoggedIn"
			class="mt-8 bg-surface-menu-bar rounded-md border border-outline-gray-2 p-6"
		>
			<div class="flex items-center justify-between">
				<div>
					<h3 class="text-base font-semibold text-ink-gray-9">
						{{ __('Sign in to book appointments') }}
					</h3>
					<p class="mt-1 text-sm text-ink-gray-6">
						{{
							__(
								'Create an account to book appointments and manage your gamemarketings'
							)
						}}
					</p>
				</div>
				<Button
					variant="solid"
					theme="blue"
					@click="() => (window.location.href = '/login')"
				>
					{{ __('Sign In') }}
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { createResource, usePageMeta, Button } from 'frappe-ui'
import { sessionStore } from '@/stores/session'
import {
	Stethoscope,
	Calendar,
	Clock,
	ChevronRight,
} from 'lucide-vue-next'

const { isLoggedIn } = sessionStore()

const upcomingGamemarketings = createResource({
	url: 'gamemarketing.gamemarketing.api.get_my_gamemarketings',
	auto: isLoggedIn.value,
})

usePageMeta(() => {
	return {
		title: 'Home',
	}
})
</script>
