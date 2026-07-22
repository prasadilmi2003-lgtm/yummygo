<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ProductModal from '../components/ProductModal.vue'
import { productDetailsById, type ProductDetailFields } from '../data/productDetails'
import { useCart } from '../composables/useCart'
import type { CartProductLike } from '../types/cart'
import { useRoute, useRouter } from 'vue-router'

type MenuOffer = ProductDetailFields & {
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

const createFallbackDetails = (item: DummyRecipe): ProductDetailFields => ({
  description: `${item.name} is prepared with fresh ingredients and balanced spices for a rich, comforting flavor. It is carefully cooked to keep the texture and aroma satisfying in every bite.`,
  ingredients: ['Fresh vegetables', 'Chef blend spices', 'Herbs', 'House sauce'],
  calories: '450 kcal',
  serving: 'Serves 1',
  deliveryTime: `${Math.max(15, item.cookTimeMinutes - 5)}-${item.cookTimeMinutes + 5} min`,
  spicyLevel: 'Mild',
  foodType: 'Veg',
  tags: ['Fresh', 'Popular'],
})

const tabs = ['All', 'Pizza', 'Burgers', 'Veg & Healthy', 'Seafood', 'Drinks']

const selectedTab = ref('All')
const offers = ref<MenuOffer[]>([])
const isLoading = ref(true)
const selectedProduct = ref<MenuOffer | null>(null)
const { addToCart, openCart } = useCart()
const route = useRoute()
const router = useRouter()
const searchTerm = ref('')

const assignCategory = (id: number) => {
  const categories = ['Pizza', 'Burgers', 'Veg & Healthy', 'Seafood', 'Drinks']
  return categories[id % categories.length]
}

const normalize = (value: string): string => value.trim().toLowerCase()

const filteredOffers = computed(() => {
  const normalizedSearch = normalize(searchTerm.value)

  return offers.value.filter((offer) => {
    const categoryMatch = selectedTab.value === 'All' || offer.category === selectedTab.value
    if (!categoryMatch) return false
    if (!normalizedSearch) return true

    const searchableValues = [
      offer.title,
      offer.description,
      offer.category,
      offer.foodType,
      offer.spicyLevel,
      offer.tags.join(' '),
      offer.ingredients.join(' '),
    ]

    return searchableValues.some((value) => normalize(value).includes(normalizedSearch))
  })
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
  ...((productDetailsById[item.id] || createFallbackDetails(item)) as ProductDetailFields),
  id: item.id,
  title: item.name,
  description:
    productDetailsById[item.id]?.description ||
    createFallbackDetails(item).description,
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

const openProductModal = (item: MenuOffer) => {
  selectedProduct.value = item
}

const closeProductModal = () => {
  selectedProduct.value = null
}

const handleAddToBasket = (payload: { product: CartProductLike; quantity: number }) => {
  addToCart(payload.product, payload.quantity)
  openCart()
}

const syncSearchFromRoute = () => {
  const q = route.query.q
  searchTerm.value = typeof q === 'string' ? q.trim() : ''
}

const syncCategoryFromRoute = () => {
  const category = route.query.category
  selectedTab.value =
    typeof category === 'string' && tabs.includes(category) ? category : 'All'
}

const applySearch = () => {
  const query = searchTerm.value.trim()
  router.replace({
    query: query ? { ...route.query, q: query } : { ...route.query, q: undefined },
  })
}

const selectTab = (tab: string) => {
  selectedTab.value = tab
  router.replace({
    query:
      tab === 'All'
        ? { ...route.query, category: undefined }
        : { ...route.query, category: tab },
  })
}

watch(
  () => route.query.q,
  () => {
    syncSearchFromRoute()
  },
)

watch(
  () => route.query.category,
  () => {
    syncCategoryFromRoute()
  },
)

syncSearchFromRoute()
syncCategoryFromRoute()
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

      <form class="mt-4 flex w-full max-w-md items-center gap-2" @submit.prevent="applySearch">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search food items..."
          class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-orange-400 transition focus:ring dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          class="rounded-xl bg-[#ff8908] px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      <div class="mt-4 flex flex-wrap items-center gap-2 border-b border-gray-300/80 pb-4 dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition"
          :class="selectedTab === tab ? 'bg-[#ff8908] text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'"
          @click="selectTab(tab)"
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
              class="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90"
              @click="openProductModal(item)"
            >
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold text-gray-900 dark:text-white md:text-base">
                  {{ item.title }}
                </p>

                <p class="mt-1 text-xs font-semibold text-[#ff8908] md:text-sm">
                  {{ item.badge }}
                </p>
              </div>

              <div class="relative h-16 w-16 flex-shrink-0 md:h-18 md:w-18">
                <img
                  :src="item.imageUrl"
                  :alt="item.title"
                  class="h-full w-full rounded-xl object-cover"
                />

                <button
                  class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#111827] text-sm font-bold text-white transition hover:bg-[#ff8908] dark:bg-gray-700"
                  type="button"
                  @click.stop="openProductModal(item)"
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
          No food items found. Try another search.
        </p>
      </div>
    </div>

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeProductModal"
      @add-to-basket="handleAddToBasket"
    />
  </section>
</template>