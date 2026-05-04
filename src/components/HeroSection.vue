<script setup lang="ts">
import girlBurger from '../assets/girl-burger.png'
import boyNoodles from '../assets/boy-noodles.png'
</script>

<template>
  <section class="bg-white px-16 py-12 dark:bg-gray-950">
    
    <!-- 🔹 Inner Card -->
    <div class="relative overflow-hidden rounded-2xl bg-[#EEEEEE] border border-gray-200 shadow-sm px-12 py-14 min-h-[420px] dark:bg-gray-900 dark:border-gray-800">
      
      <!-- LEFT CONTENT -->
      <div class="relative z-20 max-w-xl">
        
        <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
          Order Restaurant food, takeaway and groceries.
        </p>

        <h1 class="text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Delicious Food,
          <br />
          <span class="text-[#F97316]">Delivered Fast......</span>
        </h1>

        <!-- 🔍 Search Bar -->
        <div class="mt-8 flex items-center bg-white rounded-full p-2 w-full max-w-md shadow-sm dark:bg-gray-950">
          
          <input
            type="text"
            placeholder="Search YUMMY GO"
            class="flex-1 bg-transparent outline-none px-4 text-sm text-gray-900 placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
          />

          <!-- 🔥 UPDATED BUTTON -->
          <button class="bg-[#F97316] hover:bg-[#fb923c] active:scale-95 text-white px-8 py-3 rounded-full font-semibold transition duration-200">
            Search
          </button>

        </div>
      </div>

      <!-- 🔶 ORANGE SHAPE -->
      <div class="absolute right-0 top-10 h-[420px] w-[420px] bg-[#F97316] rounded-l-full"></div>

      <!-- 🖼️ GIRL IMAGE -->
      <img
        :src="girlBurger"
        alt="Girl holding burger"
        class="absolute bottom-0 right-[300px] z-20 h-[420px] object-contain"
      />

      <!-- 🖼️ BOY IMAGE -->
      <img
        :src="boyNoodles"
        alt="Boy eating noodles"
        class="absolute bottom-10 right-20 z-10 h-[300px] rounded-xl object-cover shadow-md"
      />

    </div>

  </section>
</template>