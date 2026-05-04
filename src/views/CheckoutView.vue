<script setup lang="ts">
import { ref } from 'vue'

const deliveryType = ref<'delivery' | 'collection'>('delivery')
const paymentType = ref<'card' | 'cod'>('card')
</script>

<template>
  <section class="bg-[#efefef] px-6 py-8 md:px-16 md:py-10 dark:bg-gray-950">
    <div class="mx-auto w-full max-w-4xl">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">Checkout</h1>

      <div class="space-y-4">
        <article class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 class="mb-3 text-sm font-bold text-gray-900 dark:text-white">Delivery Method</h2>
          <div class="flex w-fit rounded-full bg-gray-100 p-1 dark:bg-gray-800">
            <button
              type="button"
              class="rounded-full px-5 py-1.5 text-xs font-semibold transition"
              :class="deliveryType === 'delivery' ? 'bg-[#ff8908] text-white' : 'text-gray-600'"
              @click="deliveryType = 'delivery'"
            >
              Delivery
            </button>
            <button
              type="button"
              class="rounded-full px-5 py-1.5 text-xs font-semibold transition"
              :class="deliveryType === 'collection' ? 'bg-[#ff8908] text-white' : 'text-gray-600'"
              @click="deliveryType = 'collection'"
            >
              Collection
            </button>
          </div>
          <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">Delivery in 20-25 minutes</p>
        </article>

        <article class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 class="mb-3 text-sm font-bold text-gray-900 dark:text-white">Delivery Information</h2>
          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Full Name</label>
              <input
                type="text"
                value="Arul Peris"
                class="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label class="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Phone Number</label>
              <input
                type="text"
                value="+94 745 155"
                class="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          <div class="mt-3">
            <label class="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Delivery Address</label>
            <input
              type="text"
              value="22/4/24, Piliyandala"
              class="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
        </article>

        <article class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 class="mb-3 text-sm font-bold text-gray-900 dark:text-white">Payment Method</h2>
          <div class="grid gap-2 md:grid-cols-2">
            <button
              type="button"
              class="rounded-lg border px-3 py-2 text-left text-xs font-semibold transition"
              :class="paymentType === 'card' ? 'border-[#ff8908] bg-orange-50 text-gray-800' : 'border-gray-200 text-gray-600'"
              @click="paymentType = 'card'"
            >
              Credit/Debit Card
            </button>
            <button
              type="button"
              class="rounded-lg border px-3 py-2 text-left text-xs font-semibold transition"
              :class="paymentType === 'cod' ? 'border-[#ff8908] bg-orange-50 text-gray-800' : 'border-gray-200 text-gray-600'"
              @click="paymentType = 'cod'"
            >
              Cash on Delivery
            </button>
          </div>

          <div class="mt-3">
            <label class="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Card Number</label>
            <input
              type="text"
              value="0000 0000 0000 0000"
              class="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          <div class="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Expiry Date</label>
              <input type="text" value="11/11" class="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200" />
            </div>
            <div>
              <label class="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">CVV</label>
              <input type="text" value="***" class="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200" />
            </div>
          </div>
        </article>

        <article class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 class="mb-3 text-sm font-bold text-gray-900 dark:text-white">Order Notes</h2>
          <textarea
            rows="3"
            placeholder="Add special instructions for the restaurant or driver..."
            class="w-full resize-none rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500"
          />
        </article>

        <div class="pb-2 pt-1">
          <button
            type="button"
            class="mx-auto block w-full max-w-xs rounded-full bg-[#ff8908] py-2 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            PAY
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
