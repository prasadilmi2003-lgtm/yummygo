<script setup lang="ts">
const categories = [
  {
    name: 'Burgers & Fast food',
    count: '21 Restaurants',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
  },
  {
    name: 'Salads',
    count: '32 Restaurants',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500'
  },
  {
    name: 'Pasta & Casuals',
    count: '4 Restaurants',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500'
  },
  {
    name: 'Pizza',
    count: '32 Restaurants',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500'
  },
  {
    name: 'Breakfast',
    count: '4 Restaurants',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500'
  },
  {
    name: 'Soups',
    count: '32 Restaurants',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500'
  }
]
</script>

<template>
  <section class="bg-white px-16 py-10 dark:bg-gray-950">
    <h2 class="mb-8 text-3xl font-extrabold text-gray-950 dark:text-white">
      YUMMY GO Popular Categories 🤩
    </h2>

    <div class="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
      <div
        v-for="category in categories"
        :key="category.name"
        class="overflow-hidden rounded-lg border border-gray-200 bg-[#F4F4F4] transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
      >
        <img
          :src="category.image"
          :alt="category.name"
          class="h-36 w-full object-cover"
        />

        <div class="px-4 py-3">
          <h3 class="text-sm font-bold text-gray-950 dark:text-white">
            {{ category.name }}
          </h3>

          <p class="text-xs text-orange-500">
            {{ category.count }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>