<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import girlPizzaBox from '../assets/girl-pizza-box.png'
import girlPizzaPoint from '../assets/girl-pizza-point.png'
import girlPizzaEating from '../assets/girl-pizza-eating.png'

const router = useRouter()
const searchTerm = ref('')

const handleSearch = () => {
  const query = searchTerm.value.trim()
  router.push({
    path: '/browse-menu',
    query: query ? { q: query } : {},
  })
}
</script>

<template>
  <section class="bg-white px-4 py-8 md:px-8 lg:px-10 dark:bg-gray-950">
    <div
      class="relative mx-auto min-h-[420px] w-full max-w-[1250px] overflow-hidden rounded-2xl border border-[#14224a] bg-[#030d34] px-6 py-10 md:px-11 md:py-12"
    >
      <!-- Orange Right Shape -->
      <div class="absolute right-0 bottom-0 h-[90%] w-[38%] rounded-l-[140px] bg-[#ff9000]"></div>

      <!-- Dark faded background girl -->
      <img
        :src="girlPizzaEating"
        alt="Hero faded person"
        class="absolute bottom-0 left-[43%] z-10 hidden h-[95%] -translate-x-1/2 object-contain opacity-20 md:block"
      />

      <!-- Text Content -->
      <div class="relative z-30 max-w-[520px]">
        <p class="mb-5 text-sm text-white/75">
          Order Restaurant food, takeaway and groceries.
        </p>

        <h1 class="text-[40px] font-extrabold leading-[1.1] text-white md:text-[58px]">
          Delicious Food
          <br />
          <span class="text-[#ff9000]">Delivered Fast......</span>
        </h1>

        <form
          class="mt-8 flex h-[56px] w-full max-w-[430px] items-center rounded-full bg-white p-1.5"
          @submit.prevent="handleSearch"
        >
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search YUMMY GO"
            class="flex-1 bg-transparent px-5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            class="h-full rounded-full bg-[#ff9000] px-9 text-sm font-semibold text-white transition hover:bg-[#f39c12]"
          >
            Search
          </button>
        </form>
      </div>

      <!-- Main middle girl -->
      <img
        :src="girlPizzaPoint"
        alt="Main hero person"
        class="absolute bottom-0 right-[24%] z-30 hidden h-[100%] object-contain md:block"
      />

      <!-- Right side girl with pizza box -->
      <img
        :src="girlPizzaBox"
        alt="Right hero person"
        class="absolute bottom-0 right-3 z-20 hidden h-[85%] object-contain md:block"
      />
    </div>
  </section>
</template>