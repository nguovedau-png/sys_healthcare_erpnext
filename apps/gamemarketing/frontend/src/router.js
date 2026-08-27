import { createRouter, createWebHistory } from 'vue-router'
import { usersStore } from './stores/user'
import { sessionStore } from './stores/session'
import { useSettings } from './stores/settings'
import { getGamemarketingBasePath } from './utils/basePath'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: () => import('@/pages/Doctors.vue'),
  },
  {
    path: '/doctors/:doctorName',
    name: 'DoctorDetail',
    component: () => import('@/pages/DoctorDetail.vue'),
    props: true,
  },
  {
    path: '/my-gamemarketings',
    name: 'MyGamemarketings',
    component: () => import('@/pages/MyGamemarketings.vue'),
  },
]

let router = createRouter({
  history: createWebHistory(`/${getGamemarketingBasePath()}`),
  routes,
})

router.beforeEach(async (to, from, next) => {
	const { userResource } = usersStore()
	let { isLoggedIn } = sessionStore()
	const { settings } = useSettings()

	try {
		if (isLoggedIn) {
			await userResource.promise
		}
	} catch (error) {
		isLoggedIn = false
	}

	if (!isLoggedIn) {
		if (to.name == 'Home') router.push({ name: 'Doctors' })

		await settings.promise
		if (!settings.data.allow_guest_access) {
			window.location.href = '/login'
			return
		}
	}
	return next()
})

export default router
