<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CartItem } from '../types/cart'

const props = defineProps<{
  isOpen: boolean
  cartItems: CartItem[]
}>()

const emit = defineEmits<{
  close: []
  'remove-item': [id: number | string]
  'update-quantity': [payload: { id: number | string; quantity: number }]
  checkout: []
}>()

const deliveryFee = 100
const discount = computed(() => 0)
const couponCode = ref('')
const fulfillmentType = ref<'delivery' | 'collection'>('delivery')

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value === 'string') {
    const normalized = value.replace(/,/g, '')
    const numericPart = normalized.match(/-?\d+(?:\.\d+)?/g)?.[0]
    if (!numericPart) return 0
    const parsed = Number(numericPart)
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

const itemLineTotal = (item: CartItem): number => {
  const unitPrice = toNumber(item.price)
  const qty = Math.max(1, Math.trunc(toNumber(item.quantity)))
  return unitPrice * qty
}

const subtotal = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + itemLineTotal(item), 0)
})

const total = computed(() => {
  const fee = fulfillmentType.value === 'delivery' ? deliveryFee : 0
  return subtotal.value + fee - discount.value
})

const formatAmount = (value: number): string => {
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2)
}

const updateItemQuantity = (item: CartItem, diff: number) => {
  const nextQty = Math.max(1, item.quantity + diff)
  emit('update-quantity', { id: item.id, quantity: nextQty })
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
      @click="emit('close')"
    >
      <aside
        class="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col overflow-hidden rounded-l-3xl bg-white text-gray-900 shadow-2xl dark:bg-gray-900 dark:text-gray-100"
        @click.stop
      >
        <div class="flex items-center justify-between bg-green-600 px-5 py-4 text-white">
          <div class="flex items-center gap-3">
            <span class="text-xl">🧺</span>
            <h2 class="text-lg font-bold">My Basket</h2>
          </div>
          <button
            type="button"
            class="h-8 w-8 rounded-full bg-white/20 text-sm font-semibold transition hover:bg-white/30"
            @click="emit('close')"
          >
            x
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-4 pb-36">
          <div
            v-if="!cartItems.length"
            class="mt-10 rounded-2xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700"
          >
            <p class="text-base font-semibold">Your basket is empty</p>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Add delicious items from the menu to get started.
            </p>
          </div>

          <div v-else class="space-y-3">
            <article
              v-for="item in cartItems"
              :key="item.id"
              class="rounded-2xl border border-gray-200 p-3 dark:border-gray-700"
            >
              <div class="flex items-start gap-3">
                <img :src="item.image" :alt="item.name" class="h-14 w-14 rounded-xl object-cover" />
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <p class="truncate text-sm font-semibold">{{ item.name }}</p>
                    <p class="text-sm font-bold text-orange-500">Rs. {{ formatAmount(itemLineTotal(item)) }}</p>
                  </div>
                  <p class="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{{ item.note }}</p>
                  <div class="mt-2 flex items-center justify-between">
                    <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      {{ item.quantity }}x
                    </span>
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="h-7 w-7 rounded-full bg-gray-100 text-sm font-bold dark:bg-gray-800"
                        @click="updateItemQuantity(item, -1)"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        class="h-7 w-7 rounded-full bg-gray-100 text-sm font-bold dark:bg-gray-800"
                        @click="updateItemQuantity(item, 1)"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        class="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
                        @click="emit('remove-item', item.id)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <div class="my-2 border-t border-dashed border-gray-300 dark:border-gray-700"></div>

            <div class="rounded-2xl border border-gray-200 p-3 text-sm dark:border-gray-700">
              <div class="flex items-center justify-between py-1">
                <span class="text-gray-600 dark:text-gray-300">Sub Total</span>
                <span class="font-semibold">Rs. {{ formatAmount(subtotal) }}</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-gray-600 dark:text-gray-300">Discounts</span>
                <span class="font-semibold">Rs. {{ formatAmount(discount) }}</span>
              </div>
              <div class="flex items-center justify-between py-1">
                <span class="text-gray-600 dark:text-gray-300">Delivery Fee</span>
                <span class="font-semibold">
                  Rs. {{ fulfillmentType === 'delivery' ? formatAmount(deliveryFee) : '0' }}
                </span>
              </div>
              <div class="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 text-base font-bold dark:border-gray-700">
                <span>Total to Pay</span>
                <span class="text-orange-500">Rs. {{ formatAmount(total) }}</span>
              </div>
            </div>

            <div class="rounded-2xl border border-gray-200 p-3 dark:border-gray-700">
              <p class="text-sm font-semibold">Coupon Code</p>
              <div class="mt-2 flex gap-2">
                <input
                  v-model="couponCode"
                  type="text"
                  placeholder="Enter coupon"
                  class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-orange-400 transition focus:ring dark:border-gray-600 dark:bg-gray-800"
                />
                <button
                  type="button"
                  class="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Apply
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button
                type="button"
                class="rounded-2xl border px-3 py-3 text-sm font-semibold transition"
                :class="
                  fulfillmentType === 'delivery'
                    ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-300'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                "
                @click="fulfillmentType = 'delivery'"
              >
                Delivery
              </button>
              <button
                type="button"
                class="rounded-2xl border px-3 py-3 text-sm font-semibold transition"
                :class="
                  fulfillmentType === 'collection'
                    ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-300'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                "
                @click="fulfillmentType = 'collection'"
              >
                Collection
              </button>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white/95 p-4 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
          <button
            type="button"
            class="w-full rounded-2xl bg-[#111827] px-5 py-3 text-base font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!cartItems.length"
            @click="emit('checkout')"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
