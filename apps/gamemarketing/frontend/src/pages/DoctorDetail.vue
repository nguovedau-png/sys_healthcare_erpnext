<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div v-if="doctor.data" class="bg-white rounded-lg shadow p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ doctor.data.doctor_name }}</h1>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-gray-600">Specialization:</p>
            <p class="font-semibold">{{ doctor.data.specialization }}</p>
          </div>
          <div>
            <p class="text-gray-600">Experience:</p>
            <p class="font-semibold">{{ doctor.data.experience_years }} years</p>
          </div>
          <div>
            <p class="text-gray-600">Qualification:</p>
            <p class="font-semibold">{{ doctor.data.qualification }}</p>
          </div>
          <div>
            <p class="text-gray-600">Consultation Fee:</p>
            <p class="font-semibold">${{ doctor.data.consultation_fee }}</p>
          </div>
        </div>
        
        <div class="border-t pt-6">
          <h2 class="text-xl font-semibold mb-4">Book Appointment</h2>
          <form @submit.prevent="createGamemarketing" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gamemarketing Date</label>
              <input 
                v-model="gamemarketingDate" 
                type="date" 
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Gamemarketing Time</label>
              <input 
                v-model="gamemarketingTime" 
                type="time" 
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea 
                v-model="notes" 
                rows="3"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Confirm Gamemarketing
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createResource, createListResource } from 'frappe-ui'
import { useRouter } from 'vue-router'

const props = defineProps(['doctorName'])
const router = useRouter()

const gamemarketingDate = ref('')
const gamemarketingTime = ref('')
const notes = ref('')

const doctor = createResource({
  url: 'gamemarketing.gamemarketing.api.get_doctor',
  params: { doctor_name: props.doctorName },
  auto: true,
})

const createGamemarketing = () => {
  const gamemarketing = createResource({
    url: 'gamemarketing.gamemarketing.api.create_gamemarketing',
    makeParams() {
      return {
        doctor: props.doctorName,
        gamemarketing_date: gamemarketingDate.value,
        gamemarketing_time: gamemarketingTime.value,
        notes: notes.value,
      }
    },
    onSuccess() {
      alert('Gamemarketing created successfully!')
      router.push('/my-gamemarketings')
    },
    onError(err) {
      alert('Error creating gamemarketing: ' + err.message)
    }
  })
  
  gamemarketing.reload()
}
</script>
