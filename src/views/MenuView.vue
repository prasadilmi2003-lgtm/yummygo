<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type MenuOffer = {
  id: number
  title: string
  description: string
  badge: string
  category: string
  section: string
  imageUrl: string
}

type DummyRecipe = {
  id: number
  name: string
  image: string
  rating: number
  cuisine: string
  cookTimeMinutes: number 
}

const tabs = ['All', 'Pizza', 'Burgers', 'Veg & Healthy', 'Seafood', 'Drinks']

const selectedTab = ref('All')
const offers = ref<MenuOffer[]>([])
const isLoading = ref(true)

const assignCategory = (id: number) => {
  const categories = ['Pizza', 'Burgers', 'Veg & Healthy', 'Seafood', 'Drinks']
  return categories[id % categories.length]
}

const filteredOffers = computed(() => {
  if (selectedTab.value === 'All') return offers.value
  return offers.value.filter((offer) => offer.category === selectedTab.value)
})

const groupedOffers = computed(() => {
  return filteredOffers.value.reduce<Record<string, MenuOffer[]>>((acc, offer) => {
    if (!acc[offer.section]) acc[offer.section] = []
    acc[offer.section].push(offer)
    return acc
  }, {})
})

const loadMenu = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=18')
   const data = (await response.json()) as { recipes: DummyRecipe[] }

offers.value = data.recipes.map((item) => ({
  id: item.id,
  title: item.name,
  description: `${item.cuisine} • ${item.cookTimeMinutes} min • ⭐ ${item.rating}`,
  badge: `Rs. ${800 + item.id * 120}`,
  category: assignCategory(item.id),
  section: 'POPULAR FOOD ITEMS',
  imageUrl: item.image,
}))
  } catch (error) {
    console.error('Failed to load DummyJSON menu:', error)
    offers.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(loadMenu)
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
      <h1 class="text-xl font-extrabold tracking-wide text-gray-900 dark:text-white md:text-2xl">
        BROWSE MENU
      </h1>

      <div class="mt-4 flex flex-wrap items-center gap-2 border-b border-gray-300/80 pb-4 dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition"
          :class="selectedTab === tab ? 'bg-[#ff8908] text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'"
          @click="selectedTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div v-if="isLoading" class="py-8 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
        Loading menu...
      </div>

      <div v-else class="mt-5 space-y-6">
        <article v-for="(items, sectionName) in groupedOffers" :key="sectionName">
          <h2 class="mb-3 text-xs font-extrabold tracking-[0.2em] text-gray-900 dark:text-white md:text-sm">
            {{ sectionName }}
          </h2>

          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex items-center justify-between rounded-xl border border-white/70 bg-white/85 p-3 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/85"
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
                <img
                  :src="item.imageUrl"
                  :alt="item.title"
                  class="h-full w-full rounded-xl object-cover"
                />

                <button
                  class="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#111827] text-sm font-bold text-white transition hover:bg-[#ff8908] dark:bg-gray-700"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>

        <p
          v-if="!Object.keys(groupedOffers).length"
          class="py-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          No menu cards found for this category.
        </p>
      </div>
    </div>
  </section>
</template>