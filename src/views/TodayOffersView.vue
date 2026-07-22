<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductModal from '../components/ProductModal.vue'
import { useCart } from '../composables/useCart'
import type { CartProductLike } from '../types/cart'
import {
  getAllOfferFoods,
  getCampaignById,
  getOfferFoodsByCampaign,
  type OfferFoodItem,
} from '../data/foodOffers'

const route = useRoute()
const { addToCart, openCart } = useCart()

const selectedProduct = ref<OfferFoodItem | null>(null)
const activeCampaignId = ref<string | null>(null)

const syncCampaignFromRoute = () => {
  const offer = route.query.offer
  activeCampaignId.value = typeof offer === 'string' && offer.trim() ? offer.trim() : null
}

const activeCampaign = computed(() => {
  if (!activeCampaignId.value) return null
  return getCampaignById(activeCampaignId.value) || null
})

const offerFoods = computed(() => {
  if (activeCampaignId.value) {
    return getOfferFoodsByCampaign(activeCampaignId.value)
  }
  return getAllOfferFoods()
})

const pageTitle = computed(() => {
  if (activeCampaign.value) return activeCampaign.value.tag
  return 'Today\'s Food Offers'
})

const pageSubtitle = computed(() => {
  if (activeCampaign.value) {
    return activeCampaign.value.title.replace('\n', ' ')
  }
  return 'All discounted items available for a limited time.'
})

watch(
  () => route.query.offer,
  () => {
    syncCampaignFromRoute()
  },
)

syncCampaignFromRoute()

const openProductModal = (item: OfferFoodItem) => {
  selectedProduct.value = item
}

const closeProductModal = () => {
  selectedProduct.value = null
}

const handleAddToBasket = (payload: { product: CartProductLike; quantity: number }) => {
  addToCart(payload.product, payload.quantity)
  openCart()
}
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
        {{ pageTitle }}
      </h1>

      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {{ pageSubtitle }}
      </p>

      <div v-if="offerFoods.length" class="mt-6 grid gap-4 md:grid-cols-2">
        <div
          v-for="item in offerFoods"
          :key="item.id"
          class="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/90"
          @click="openProductModal(item)"
        >
          <div class="min-w-0 flex-1">
            <span class="inline-block rounded-full bg-[#ff8908] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              {{ item.offerLabel }}
            </span>

            <p class="mt-2 truncate text-sm font-bold text-gray-900 dark:text-white md:text-base">
              {{ item.title }}
            </p>

            <div class="mt-1 flex items-center gap-2">
              <p class="text-xs font-semibold text-[#ff8908] md:text-sm">
                {{ item.badge }}
              </p>
              <p class="text-xs text-gray-400 line-through md:text-sm">
                {{ item.originalBadge }}
              </p>
            </div>
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

      <p
        v-else
        class="py-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
      >
        No offer items found for this deal.
      </p>
    </div>

    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeProductModal"
      @add-to-basket="handleAddToBasket"
    />
  </section>
</template>
