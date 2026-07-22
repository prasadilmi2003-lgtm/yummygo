<script setup lang="ts">
import { RouterLink } from 'vue-router'
import bakeryOffer from '../assets/offers/bakery-offer.png'
import deliveryOffer from '../assets/offers/delivery-offer.png'
import { foodOfferCampaigns } from '../data/foodOffers'

const offerImages: Record<string, string> = {
  'burger-pizza-deal': bakeryOffer,
  'drinks-deal': deliveryOffer,
}

const offers = foodOfferCampaigns.map((campaign) => ({
  ...campaign,
  image: offerImages[campaign.id] || bakeryOffer,
  link: { path: '/today-offers', query: { offer: campaign.id } },
}))
</script>

<template>
  <section class="bg-white px-16 py-10 dark:bg-gray-950">
    <h2 class="mb-10 text-3xl font-extrabold text-gray-950 dark:text-white">
      TODAY OFFERS
    </h2>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <RouterLink
        v-for="offer in offers"
        :key="offer.id"
        :to="offer.link"
        class="group relative block h-[360px] overflow-hidden rounded-xl shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <img
          :src="offer.image"
          :alt="offer.tag"
          class="h-full w-full object-cover transition group-hover:scale-105"
        />

        <div class="absolute inset-0 bg-black/45"></div>

        <div class="absolute left-12 top-0 rounded-b-xl bg-white px-10 py-5 text-sm font-extrabold text-gray-950 dark:bg-gray-900 dark:text-white">
          {{ offer.tag }}
        </div>

        <div class="absolute bottom-10 left-8">
          <h3 class="whitespace-pre-line text-3xl font-extrabold leading-snug text-white">
            {{ offer.title }}
          </h3>

          <span class="mt-5 inline-block rounded-full bg-[#FF8908] px-10 py-3 text-sm font-semibold text-white transition group-hover:bg-orange-600">
            Order Now
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
