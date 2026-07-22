<script setup lang="ts">
import { popularFoodItems } from '../data/popularFoodItems'
import { useCart } from '../composables/useCart'

const { addToCart, openCart } = useCart()

const buyItem = (item: (typeof popularFoodItems)[number]) => {
  addToCart(item, 1)
  openCart()
}
</script>

<template>
  <section class="bg-white px-16 py-10 dark:bg-gray-950">
    <h2 class="mb-8 text-3xl font-extrabold text-gray-950 dark:text-white">
      YUMMY GO Popular Food Items 
    </h2>

    <div class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
      <button
        v-for="item in popularFoodItems"
        :key="item.id"
        type="button"
        class="group overflow-hidden rounded-lg border border-gray-200 bg-[#F4F4F4] text-left transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-orange-500"
        @click="buyItem(item)"
      >
        <img
          :src="item.imageUrl"
          :alt="item.title"
          class="h-36 w-full object-cover transition group-hover:scale-105"
        />

        <div class="px-4 py-3">
          <h3 class="text-sm font-bold text-gray-950 transition group-hover:text-orange-500 dark:text-white">
            {{ item.title }}
          </h3>

          <p class="mt-1 text-xs font-semibold text-orange-500">
            {{ item.badge }}
          </p>
        </div>
      </button>
    </div>
  </section>
</template>
