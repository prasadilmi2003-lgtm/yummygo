<script setup lang="ts">
import { RouterLink } from 'vue-router'

import logoLight from '../assets/logo.png'
import logoDark from '../assets/logo-dark.png'
</script>

<template>
  <footer class="bg-[#EEEEEE] px-16 pt-14 dark:bg-gray-900">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-4">
      
      <!-- Logo + Info -->
      <div>
        <RouterLink to="/" class="mb-4 inline-flex items-center">
          <span class="flex h-10 items-center overflow-visible md:h-12">
            <img
              :src="logoLight"
              alt="YummyGo Logo"
              class="h-10 w-auto origin-left scale-[4.25] object-contain md:h-12 md:scale-[5.5] dark:hidden"
            />
            <img
              :src="logoDark"
              alt="YummyGo Logo"
              class="hidden h-10 w-auto origin-left scale-[4.25] object-contain md:h-12 md:scale-[5.5] dark:block"
            />
          </span>
        </RouterLink>

        <div class="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
          <p>yummygo@gmail.com</p>
          <p>+94 77 545 8685</p>
        </div>

        <p class="mt-4 text-sm text-gray-700 dark:text-gray-300">
          Company # 490039-445, Registered with House of companies.
        </p>
      </div>

      <!-- Subscribe -->
      <div>
        <h3 class="mb-5 font-extrabold text-gray-950 dark:text-white">
          Get Exclusive Deals in your Inbox
        </h3>

        <div class="flex rounded-full bg-gray-300 p-1 dark:bg-gray-800">
          <input
            type="email"
            placeholder="youremail@gmail.com"
            class="flex-1 bg-transparent px-5 text-sm outline-none text-gray-900 placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-500"
          />

          <button class="rounded-full bg-[#FF8908] px-7 py-3 text-sm font-semibold text-white">
            Subscribe
          </button>
        </div>

        <p class="mt-3 text-xs text-gray-700 dark:text-gray-300">
          we wont spam, read our <u>email policy</u>
        </p>

        
      </div>

      <!-- Legal Pages -->
      <div>
        <h3 class="mb-5 font-extrabold text-gray-950 dark:text-white">
          Legal Pages
        </h3>

        <ul class="space-y-4 text-sm text-gray-800 underline dark:text-gray-200">
          <li>Terms and conditions</li>
          <li>Privacy</li>
          <li>Cookies</li>
          <li>Modern Slavery Statement</li>
        </ul>
      </div>

      <!-- Important Links -->
      <div>
        <h3 class="mb-5 font-extrabold text-gray-950 dark:text-white">
          Important Links
        </h3>

        <ul class="space-y-4 text-sm text-gray-800 underline dark:text-gray-200">
          <li>Get help</li>
          <li>Add your restaurant</li>
          <li>Sign up to deliver</li>
          <li>Create a business account</li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="mt-12 bg-[#05091A] px-6 py-5 text-sm text-white">
      YUMMY GO Copyright 2026, All Rights Reserved.
    </div>
  </footer>
</template>