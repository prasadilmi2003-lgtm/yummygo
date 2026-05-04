<script setup lang="ts">
const stats = [
  { value: '546+', label: 'Registered Riders' },
  { value: '789,900+', label: 'Orders Delivered' },
  { value: '690+', label: 'Restaurants Partnered' },
  { value: '17,457+', label: 'Food items' },
]
</script>

<template>
  <section class="bg-white px-16 py-12 dark:bg-gray-950">
    
    <!-- 🔶 Orange Box -->
    <div class="grid grid-cols-4 bg-[#FF8908] rounded-xl px-12 py-6 text-white shadow-sm">
      
      <!-- 🔹 Each Stat -->
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="flex flex-col items-center justify-center text-center"
        :class="index !== stats.length - 1 ? 'border-r border-white/40' : ''"
      >
        
        <!-- Number -->
        <h2 class="text-4xl font-light">
          {{ stat.value }}
        </h2>

        <!-- Label -->
        <p class="mt-2 text-sm font-semibold">
          {{ stat.label }}
        </p>

      </div>

    </div>

  </section>
</template>