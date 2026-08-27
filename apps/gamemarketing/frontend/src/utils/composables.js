import { ref, onMounted, onUnmounted } from 'vue'

export function useScreenSize() {
	const isMobile = ref(window.innerWidth < 768)

	const handleResize = () => {
		isMobile.value = window.innerWidth < 768
	}

	onMounted(() => {
		window.addEventListener('resize', handleResize)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', handleResize)
	})

	return {
		isMobile,
	}
}
