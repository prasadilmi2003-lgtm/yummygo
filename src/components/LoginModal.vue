<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import logo from '../assets/logo.png'
import loginImage from '../assets/login.jpg'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const mode = ref<'login' | 'signup'>('login')

const fullName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const title = computed(() => (mode.value === 'login' ? 'Login to your YUMMY GO account' : 'Create a YUMMY GO account'))

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) mode.value = 'login'
  },
)

const onSubmit = () => {
  emit('close')
}

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => window.addEventListener('keydown', onEscape))
onUnmounted(() => {
  window.removeEventListener('keydown', onEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-md dark:bg-black/60"
        aria-hidden="true"
        @click="emit('close')"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        class="relative z-10 grid max-h-[min(90vh,760px)] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900 md:grid-cols-2"
        @click.stop
      >
        <button
          type="button"
          class="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-gray-600 shadow-sm transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Close login"
          @click="emit('close')"
        >
          ×
        </button>

        <!-- Left / top: food imagery -->
        <div class="relative h-40 shrink-0 md:h-auto md:min-h-[420px]">
         <img
  :src="loginImage"
  alt="Food"
  class="h-full w-full object-cover"
/>
          <div class="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />
        </div>

        <!-- Right: form -->
        <div class="flex flex-col overflow-y-auto bg-white px-8 pb-10 pt-8 dark:bg-gray-900 md:px-10 md:pt-10">
          <img :src="logo" alt="YUMMY GO" class="mb-6 h-9 w-auto object-contain md:h-10" />

          <h2 id="login-modal-title" class="text-center text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl">
            {{ title }}
          </h2>
          <p class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            One account for all your food deliveries.
          </p>

          <form class="mt-8 flex flex-col gap-5" @submit.prevent="onSubmit">
            <template v-if="mode === 'signup'">
              <div>
                <label for="signup-fullname" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  id="signup-fullname"
                  v-model="fullName"
                  type="text"
                  autocomplete="name"
                  class="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
                />
              </div>

              <div>
                <label for="signup-username" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  id="signup-username"
                  v-model="username"
                  type="text"
                  autocomplete="username"
                  class="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
                />
                <p class="mt-1 text-[10px] text-gray-400">You can change this later in your account profile</p>
              </div>
            </template>

            <div>
              <label
                :for="mode === 'login' ? 'login-email' : 'signup-email'"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                :id="mode === 'login' ? 'login-email' : 'signup-email'"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="you@example.com"
                class="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
              />
              <p v-if="mode === 'signup'" class="mt-1 text-[10px] text-gray-400">We respect your right to privacy and will never sell your data</p>
            </div>

            <div>
              <label
                :for="mode === 'login' ? 'login-password' : 'signup-password'"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div class="relative">
                <input
                  :id="mode === 'login' ? 'login-password' : 'signup-password'"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  class="w-full rounded-xl bg-gray-100 py-3 pe-12 ps-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <span class="text-base">{{ showPassword ? '🙈' : '👁' }}</span>
                </button>
              </div>
            </div>

            <div v-if="mode === 'signup'">
              <label for="signup-confirm" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                id="signup-confirm"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="••••••••"
                class="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
              />
            </div>

            <button
              v-if="mode === 'signup'"
              type="submit"
              class="mx-auto mt-3 w-full rounded-full bg-[#ff8908] py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600" 
            >
              Submit
            </button>

            <div v-if="mode === 'login'" class="flex justify-end">
              <button type="button" class="text-xs font-medium text-gray-500 underline hover:text-orange-500 dark:text-gray-400">
                Forgot your password?
              </button>
            </div>

            <button
              v-if="mode === 'login'"
              type="submit"
              class="w-full rounded-full bg-[#ff8908] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
            >
              Submit
            </button>
          </form>

          <p v-if="mode === 'login'" class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?
            <button
              type="button"
              class="font-semibold text-gray-900 underline hover:text-orange-500 dark:text-white"
              @click="mode = 'signup'"
            >
              Sign up here
            </button>
          </p>
          <p v-else class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <button
              type="button"
              class="font-semibold text-gray-900 underline hover:text-orange-500 dark:text-white"
              @click="mode = 'login'"
            >
              Login here.
            </button>
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
