<script setup lang="ts">
import bakeryOffer from '../assets/offers/bakery-offer.png'
import deliveryOffer from '../assets/offers/delivery-offer.png'

const offers = [
  {
    tag: '20% OFF on Bakery Items',
    title: 'Enjoy delicious Bakery Items\nIn a discounted price',
    image: bakeryOffer,
  },
  {
    tag: 'Limited Time Deal',
    title: 'Order your favourite Beverages\nwith zero delivery fee',
    image: deliveryOffer,
  },
]
</script>

<template>
  <section class="bg-white px-16 py-10 dark:bg-gray-950">
    <h2 class="mb-10 text-3xl font-extrabold text-gray-950 dark:text-white">
      TODAY OFFERS
    </h2>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div
        v-for="offer in offers"
        :key="offer.tag"
        class="relative h-[360px] overflow-hidden rounded-xl shadow-md"
      >
        <img
          :src="offer.image"
          :alt="offer.tag"
          class="h-full w-full object-cover"
        />

        <div class="absolute inset-0 bg-black/45"></div>

        <div class="absolute left-12 top-0 rounded-b-xl bg-white px-10 py-5 text-sm font-extrabold text-gray-950 dark:bg-gray-900 dark:text-white">
          {{ offer.tag }}
        </div>

        <div class="absolute bottom-10 left-8">
          <h3 class="whitespace-pre-line text-3xl font-extrabold leading-snug text-white">
            {{ offer.title }}
          </h3>

          <button class="mt-5 rounded-full bg-[#FF8908] px-10 py-3 text-sm font-semibold text-white hover:bg-orange-600">
            Order Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>