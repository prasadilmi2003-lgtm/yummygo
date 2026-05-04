<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '../assets/logo.png'
import LoginModal from './LoginModal.vue'

const darkMode = ref(false)
const loginOpen = ref(false)
const mobileMenuOpen = ref(false)

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  darkMode.value = storedTheme ? storedTheme === 'dark' : document.documentElement.classList.contains('dark')
  document.documentElement.classList.toggle('dark', darkMode.value)
})

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <header class="w-full bg-white shadow-sm transition dark:bg-gray-950">
    <!-- Top Bar -->
    <div class="border-b border-gray-200 px-4 py-2 dark:border-gray-800">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <div class="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-200">
          <span class="text-[10px]">📍</span>
          <span class="hidden sm:inline">No.23, Prince Street, Kaduwela.</span>
          <span class="sm:hidden">Kaduwela</span>
          <button type="button" class="text-[11px] text-orange-500 hover:underline">
            Change Location
          </button>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="rounded-lg bg-green-600 px-3 py-2 text-base text-white transition hover:bg-green-700"
            aria-label="Cart"
          >
            🛒
          </button>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
            @click="toggleDarkMode"
          >
            {{ darkMode ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <nav class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
      <RouterLink to="/" class="flex items-center">
        <img :src="logo" alt="YummyGo Logo" class="h-10 w-auto object-contain md:h-12" />
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="hidden items-center justify-center gap-5 text-sm font-medium lg:flex xl:gap-8">
        <li>
          <RouterLink
            to="/"
            class="rounded-full px-5 py-2 text-gray-700 transition hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400"
            exact-active-class="!bg-orange-500 !text-white hover:!bg-orange-600 hover:!text-white"
          >
            Home
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/browse-menu"
            class="rounded-full px-5 py-2 text-gray-700 transition hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400"
            exact-active-class="!bg-orange-500 !text-white hover:!bg-orange-600 hover:!text-white"
          >
            Browse Menu
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/special-offers"
            class="rounded-full px-5 py-2 text-gray-700 transition hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400"
            exact-active-class="!bg-orange-500 !text-white hover:!bg-orange-600 hover:!text-white"
          >
            Special Offers
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/checkout"
            class="rounded-full px-5 py-2 text-gray-700 transition hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400"
            exact-active-class="!bg-orange-500 !text-white hover:!bg-orange-600 hover:!text-white"
          >
            Checkout
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/track-order"
            class="rounded-full px-5 py-2 text-gray-700 transition hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400"
            exact-active-class="!bg-orange-500 !text-white hover:!bg-orange-600 hover:!text-white"
          >
            Track Order
          </RouterLink>
        </li>
      </ul>

      <!-- Right Side -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="hidden items-center gap-2 rounded-full bg-[#0a1033] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#121a4a] md:flex"
          @click="loginOpen = true"
        >
          <span class="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] text-black">👤</span>
          <span>Login/Signup</span>
        </button>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-800 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 lg:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          ☰
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="border-t border-gray-200 bg-white px-4 pb-5 pt-3 dark:border-gray-800 dark:bg-gray-950 lg:hidden"
    >
      <div class="flex flex-col gap-2 text-sm font-medium">
        <RouterLink
          to="/"
          class="rounded-full px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-800"
          exact-active-class="!bg-orange-500 !text-white"
          @click="mobileMenuOpen = false"
        >
          Home
        </RouterLink>

        <RouterLink
          to="/browse-menu"
          class="rounded-full px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-800"
          exact-active-class="!bg-orange-500 !text-white"
          @click="mobileMenuOpen = false"
        >
          Browse Menu
        </RouterLink>

        <RouterLink
          to="/special-offers"
          class="rounded-full px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-800"
          exact-active-class="!bg-orange-500 !text-white"
          @click="mobileMenuOpen = false"
        >
          Special Offers
        </RouterLink>

        <RouterLink
          to="/checkout"
          class="rounded-full px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-800"
          exact-active-class="!bg-orange-500 !text-white"
          @click="mobileMenuOpen = false"
        >
          Checkout
        </RouterLink>

        <RouterLink
          to="/track-order"
          class="rounded-full px-4 py-3 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-800"
          exact-active-class="!bg-orange-500 !text-white"
          @click="mobileMenuOpen = false"
        >
          Track Order
        </RouterLink>

        <button
          type="button"
          class="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#0a1033] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#121a4a]"
          @click="loginOpen = true; mobileMenuOpen = false"
        >
          <span class="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] text-black">👤</span>
          <span>Login/Signup</span>
        </button>
      </div>
    </div>

    <LoginModal :open="loginOpen" @close="loginOpen = false" />
  </header>
</template>