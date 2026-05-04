<script setup lang="ts">
import { computed } from 'vue'

type StepKey = 'placed' | 'preparing' | 'way' | 'delivered'

const PILIYANDALA_QUERY = 'Piliyandala, Sri Lanka'

/** Prefer Maps Embed API (`embed/v1/place`) when `VITE_GOOGLE_MAPS_EMBED_API_KEY` is set in `.env`. */
const googleMapsEmbedSrc = computed(() => {
  const key = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY as string | undefined
  const q = encodeURIComponent(PILIYANDALA_QUERY)
  if (key?.trim()) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key.trim())}&q=${q}&zoom=14`
  }
  return `https://www.google.com/maps?q=${q}&hl=en&z=14&output=embed`
})

const steps: {
  key: StepKey
  label: string
  icon: string
  state: 'done' | 'current' | 'upcoming'
}[] = [
  { key: 'placed', label: 'Order Placed', icon: '✓', state: 'done' },
  { key: 'preparing', label: 'Preparing', icon: '🍴', state: 'done' },
  { key: 'way', label: 'On The Way', icon: '🛵', state: 'current' },
  { key: 'delivered', label: 'Delivered', icon: '📍', state: 'upcoming' },
]

const driverAvatar =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80'
</script>

<template>
  <section class="bg-white px-6 py-10 md:px-12 md:py-12 dark:bg-gray-950">
    <div class="mx-auto w-full max-w-5xl">
      <header class="mb-8 md:mb-10">
        <h1 class="text-3xl font-extrabold tracking-tight text-[#0a1033] md:text-4xl dark:text-white">
          Track Your Order
        </h1>
        <p class="mt-2 text-sm text-gray-500 md:text-base dark:text-gray-400">
          Follow your order in real time
        </p>
      </header>

      <!-- Horizontal stepper -->
      <article class="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-md md:p-8 dark:border-gray-800 dark:bg-gray-900">
        <!-- Desktop: circles + connectors in one row -->
        <div class="hidden flex-wrap items-start md:flex">
          <template v-for="(step, index) in steps" :key="step.key">
            <div class="flex w-[88px] shrink-0 flex-col items-center lg:w-[100px]">
              <div
                class="flex items-center justify-center rounded-full font-semibold shadow-sm"
                :class="[
                  step.state === 'done' && 'h-11 w-11 bg-emerald-500 text-sm text-white',
                  step.state === 'current' &&
                    'h-14 w-14 bg-[#ff8908] text-lg text-white shadow-lg shadow-orange-200 ring-4 ring-orange-100 dark:shadow-orange-900/40 dark:ring-orange-950',
                  step.state === 'upcoming' && 'h-11 w-11 bg-gray-200 text-lg text-gray-500',
                ]"
              >
                <span class="leading-none">{{ step.icon }}</span>
              </div>
              <p
                class="mt-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide md:text-[11px]"
                :class="
                  step.state === 'current'
                    ? 'text-[#ff8908]'
                    : step.state === 'done'
                      ? 'text-gray-800 dark:text-gray-200'
                      : 'text-gray-400 dark:text-gray-500'
                "
              >
                {{ step.label }}
              </p>
            </div>
            <div
              v-if="index < steps.length - 1"
              class="mx-2 mt-[22px] h-1 min-w-[2rem] flex-1 rounded-full lg:mx-4"
              :class="index < 2 ? 'bg-emerald-500' : 'bg-gray-200'"
              aria-hidden="true"
            />
          </template>
        </div>

        <!-- Mobile: vertical timeline -->
        <div class="flex flex-col gap-0 md:hidden">
          <div
            v-for="(step, index) in steps"
            :key="step.key"
            class="relative flex gap-4 pb-8 last:pb-0"
          >
            <div class="flex flex-col items-center">
              <div
                class="flex items-center justify-center rounded-full font-semibold shadow-sm"
                :class="[
                  step.state === 'done' && 'h-10 w-10 bg-emerald-500 text-sm text-white',
                  step.state === 'current' &&
                    'h-12 w-12 bg-[#ff8908] text-base text-white shadow-lg shadow-orange-200 ring-4 ring-orange-100',
                  step.state === 'upcoming' && 'h-10 w-10 bg-gray-200 text-base text-gray-500',
                ]"
              >
                <span class="leading-none">{{ step.icon }}</span>
              </div>
              <div
                v-if="index < steps.length - 1"
                class="mt-2 w-0.5 flex-1 min-h-[28px] rounded-full"
                :class="index < 2 ? 'bg-emerald-500' : 'bg-gray-200'"
                aria-hidden="true"
              />
            </div>
            <div class="pt-1">
              <p
                class="text-[11px] font-bold uppercase tracking-wide"
                :class="
                  step.state === 'current'
                    ? 'text-[#ff8908]'
                    : step.state === 'done'
                      ? 'text-gray-800'
                      : 'text-gray-400'
                "
              >
                {{ step.label }}
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- Order details + Driver -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <article class="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100 text-lg dark:bg-orange-950/50">
            🏪
          </div>
          <p class="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Order ID #YG12345
          </p>
          <h2 class="mt-1 text-xl font-bold text-gray-900 dark:text-white">Pizza Hut</h2>
          <p class="mt-3 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="mt-0.5 shrink-0" aria-hidden="true">📍</span>
            <span>224/21, Piliyandala, Kasbawa</span>
          </p>
          <p class="mt-6 text-base font-bold text-[#ff8908]">Arriving in 20 minutes</p>
        </article>

        <article class="rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div class="flex items-center gap-4">
            <img
              :src="driverAvatar"
              alt="Kamal Perera"
              class="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
            />
            <div class="min-w-0 flex-1">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white">Kamal Perera</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Your Delivery Hero</p>
              <p class="mt-2 text-base font-bold text-gray-900 dark:text-white">+94 77 123 4567</p>
            </div>
            <a
              href="tel:+94771234567"
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff8908] text-white shadow-md transition hover:bg-orange-600"
              aria-label="Call driver"
            >
              <span class="text-lg" aria-hidden="true">📞</span>
            </a>
          </div>
        </article>
      </div>

      <!-- Map + actions -->
      <div class="mt-8 md:mt-10">
        <div
          class="relative h-[220px] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-md md:h-[300px] dark:border-gray-800 dark:bg-gray-900"
        >
          <iframe
            :src="googleMapsEmbedSrc"
            class="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            title="Google Map — Piliyandala"
          />
        </div>

        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <button
            type="button"
            class="flex items-center justify-center gap-2 rounded-full bg-[#ff8908] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            <span class="text-base leading-none" aria-hidden="true">🎧</span>
            Contact Support
          </button>
          <button
            type="button"
            class="rounded-full bg-gray-100 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
