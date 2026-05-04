<script setup lang="ts">
type MenuItem = {
  name: string
  description: string
  price: string
}

type MenuSection = {
  title: string
  items: MenuItem[]
}

const tabs = ['All', 'Pizza', 'Burgers', 'Veg & Healthy', 'Seafood', 'Dessert', 'Drinks']

const menuSections: MenuSection[] = [
  {
    title: 'PIZZAS',
    items: [
      { name: "Buy 2 Pizzas Get 1 Free", description: "12' pan crust with spicy chicken", price: 'Rs.1,000 OFF / Large' },
      { name: 'Stuffed Supreme', description: 'Cheese burst stuffed with veggies', price: 'Weekend Special' },
    ],
  },
  {
    title: 'BURGERS',
    items: [
      { name: 'Zinger Burger', description: 'Crispy chicken with spicy mayo', price: 'Buy 2 Save 30%' },
      { name: 'Cheeseburger', description: 'Beef patty with cheddar and onion', price: 'Buy 1 Get 1' },
    ],
  },
  {
    title: 'VEG & HEALTHY',
    items: [
      { name: 'Veggie Delight', description: 'Fresh veggies with pesto sauce', price: '15% OFF' },
      { name: 'Keto Bowl', description: 'Grilled chicken, greens and avocado', price: '20% OFF' },
    ],
  },
  {
    title: 'SEAFOOD',
    items: [
      { name: 'Prawn Rice Bowl', description: 'Spicy prawns with butter rice', price: 'Weekend Deal' },
      { name: 'Tuna Salad', description: 'Tuna chunks with lemon dressing', price: '10% OFF' },
    ],
  },
]
</script>

<template>
  <section class="bg-gray-100 px-6 py-8 md:px-16 md:py-10 dark:bg-gray-950">
    <div class="mx-auto w-full max-w-6xl rounded-xl bg-white p-4 shadow-sm md:p-6 dark:bg-gray-900">
      <h2 class="mb-4 text-xl font-extrabold tracking-wide text-gray-900 dark:text-white md:text-2xl">BROWSE MENU</h2>

      <div class="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4 dark:border-gray-800">
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          class="rounded-full px-4 py-1.5 text-sm font-semibold transition"
          :class="index === 0 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'"
        >
          {{ tab }}
        </button>
      </div>

      <div class="space-y-6">
        <article v-for="section in menuSections" :key="section.title">
          <h3 class="mb-3 text-sm font-extrabold tracking-wide text-gray-900 dark:text-white md:text-base">
            {{ section.title }}
          </h3>

          <div class="grid gap-3 md:grid-cols-2">
            <div
              v-for="item in section.items"
              :key="item.name"
              class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div class="mr-3 min-w-0">
                <p class="truncate text-sm font-bold text-gray-900 dark:text-white">{{ item.name }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ item.description }}</p>
                <p class="mt-1 text-xs font-semibold text-orange-500">{{ item.price }}</p>
              </div>

              <div class="h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-orange-300 to-orange-500" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
