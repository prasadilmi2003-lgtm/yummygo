<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type OfferItem = {
  id: number
  title: string
  description: string
  badge: string
  imageUrl: string
}

type OfferSection = {
  id: string
  title: string
  items: OfferItem[]
}

type CustomerReview = {
  id: number
  name: string
  role: string
  rating: number
  comment: string
}

type InfoBlock = {
  id: string
  title: string
  lines: string[]
}

const sections = ref<OfferSection[]>([])
const reviews = ref<CustomerReview[]>([])
const infoBlocks = ref<InfoBlock[]>([])
const isLoading = ref(true)

const cardGridClass = computed(() => {
  return (itemsCount: number) => (itemsCount === 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2')
})

const loadSpecialOffers = async () => {
  try {
    const response = await fetch('/dummy/special-offers.json')
    const data = (await response.json()) as {
      sections: OfferSection[]
      reviews: CustomerReview[]
      infoBlocks: InfoBlock[]
    }

    sections.value = data.sections
    reviews.value = data.reviews
    infoBlocks.value = data.infoBlocks
  } catch (error) {
    console.error('Failed to load special offers JSON:', error)
    sections.value = []
    reviews.value = []
    infoBlocks.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(loadSpecialOffers)
</script>

<template>
  <section
    class="relative overflow-hidden bg-cover bg-center px-6 py-8 md:px-16 md:py-10 dark:bg-gray-950"
    style="background-image: url('/images/menu-glass-bg.png');"
  >
    <div class="absolute inset-0 bg-black/40 dark:bg-black/65"></div>

    <div
      class="relative mx-auto w-full max-w-6xl rounded-xl border border-white/40 bg-white/70 p-4 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80 md:p-6"
    >
      <div v-if="isLoading" class="rounded-xl bg-white/85 p-8 text-center text-sm font-medium text-gray-600 shadow-sm dark:bg-gray-800/90 dark:text-gray-300">
        Loading special offers...
      </div>

      <div v-else class="space-y-8">
        <article
          v-for="section in sections"
          :key="section.id"
          class="rounded-xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/85 md:p-5"
        >
          <h2 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
            {{ section.title }}
          </h2>

          <div class="grid gap-4" :class="cardGridClass(section.items.length)">
            <div
              v-for="item in section.items"
              :key="item.id"
              class="flex items-center justify-between rounded-xl border border-white/70 bg-white/85 p-3 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80"
            >
              <div class="mr-3 min-w-0">
                <p class="text-sm font-bold text-gray-900 dark:text-white">
                  {{ item.title }}
                </p>
                <p class="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                  {{ item.description }}
                </p>
                <p class="mt-2 text-xs font-semibold text-[#ff8908]">
                  {{ item.badge }}
                </p>
              </div>

              <div class="relative h-20 w-20 flex-shrink-0">
                <img :src="item.imageUrl" :alt="item.title" class="h-full w-full rounded-xl object-cover" />
                <button
                  type="button"
                  class="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#111827] text-sm font-bold text-white transition hover:bg-[#ff8908] dark:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>

        <section class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article
            v-for="block in infoBlocks"
            :key="block.id"
            class="rounded-xl border p-4 shadow-sm backdrop-blur-sm"
            :class="block.id === 'operational' ? 'border-[#0b1438] bg-[#0b1438]/90 text-white' : 'border-white/70 bg-white/85 text-gray-900 dark:border-gray-700 dark:bg-gray-800/90 dark:text-white'"
          >
            <h3 class="mb-3 text-sm font-extrabold">{{ block.title }}</h3>
            <p
              v-for="line in block.lines"
              :key="line"
              class="text-xs leading-5"
              :class="block.id === 'operational' ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'"
            >
              {{ line }}
            </p>
          </article>
        </section>

        <section class="rounded-xl bg-[#ff8908]/95 p-4 shadow-sm backdrop-blur-sm md:p-6">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-xl font-extrabold text-gray-950">Customer Reviews</h3>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-800 dark:bg-gray-900 dark:text-gray-100"
            >
              ‹
            </button>
          </div>

          <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
            <article
              v-for="review in reviews"
              :key="review.id"
              class="rounded-lg border border-orange-200 bg-white p-3 shadow-sm dark:border-orange-900 dark:bg-gray-900"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-gray-900 dark:text-white">{{ review.name }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ review.role }}</p>
                </div>
                <p class="text-xs font-semibold text-orange-500">
                  {{ '★'.repeat(review.rating) }}
                </p>
              </div>
              <p class="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
