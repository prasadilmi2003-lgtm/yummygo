<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

type OfferItem = {
  id: number
  title: string
  description: string
  badge: string
  tag: string
  promoCode?: string
  validUntil?: string
  imageUrl: string
}

type OfferSection = {
  id: string
  title: string
  subtitle?: string
  items: OfferItem[]
}

type CustomerReview = {
  id: number
  name: string
  role: string
  rating: number
  comment: string
}

type InfoBlock = {
  id: string
  title: string
  icon?: string
  lines: string[]
}

type HeroContent = {
  title: string
  subtitle: string
  highlights: { label: string; value: string }[]
}

const hero = ref<HeroContent | null>(null)
const sections = ref<OfferSection[]>([])
const reviews = ref<CustomerReview[]>([])
const infoBlocks = ref<InfoBlock[]>([])
const isLoading = ref(true)
const loadError = ref(false)
const copiedCode = ref<string | null>(null)
const activeSectionId = ref<string | null>(null)
const reviewIndex = ref(0)

const featuredOffer = computed(() => sections.value[0]?.items[0] ?? null)

const totalOffers = computed(() =>
  sections.value.reduce((count, section) => count + section.items.length, 0),
)

const loadSpecialOffers = async () => {
  isLoading.value = true
  loadError.value = false

  try {
    const response = await fetch('/dummy/special-offers.json')
    if (!response.ok) throw new Error('Failed to fetch special offers')

    const data = (await response.json()) as {
      hero?: HeroContent
      sections: OfferSection[]
      reviews: CustomerReview[]
      infoBlocks: InfoBlock[]
    }

    hero.value = data.hero ?? null
    sections.value = data.sections
    reviews.value = data.reviews
    infoBlocks.value = data.infoBlocks
    activeSectionId.value = data.sections[0]?.id ?? null
  } catch (error) {
    console.error('Failed to load special offers JSON:', error)
    loadError.value = true
    sections.value = []
    reviews.value = []
    infoBlocks.value = []
  } finally {
    isLoading.value = false
  }
}

const scrollToSection = (sectionId: string) => {
  activeSectionId.value = sectionId
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const copyPromoCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    copiedCode.value = code
    window.setTimeout(() => {
      copiedCode.value = null
    }, 2000)
  } catch {
    copiedCode.value = null
  }
}

const prevReview = () => {
  if (!reviews.value.length) return
  reviewIndex.value = (reviewIndex.value - 1 + reviews.value.length) % reviews.value.length
}

const nextReview = () => {
  if (!reviews.value.length) return
  reviewIndex.value = (reviewIndex.value + 1) % reviews.value.length
}

const visibleReviews = computed(() => {
  if (!reviews.value.length) return []
  const count = Math.min(3, reviews.value.length)
  const result: CustomerReview[] = []

  for (let i = 0; i < count; i += 1) {
    result.push(reviews.value[(reviewIndex.value + i) % reviews.value.length])
  }

  return result
})

onMounted(loadSpecialOffers)
</script>

<template>
  <section
    class="relative overflow-hidden bg-cover bg-center px-6 py-8 md:px-16 md:py-10 dark:bg-gray-950"
    style="background-image: url('/images/menu-glass-bg.png');"
  >
    <div class="absolute inset-0 bg-black/40 dark:bg-black/65" />

    <div
      class="relative mx-auto w-full max-w-6xl rounded-2xl border border-white/40 bg-white/70 p-4 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80 md:p-8"
    >
      <!-- Loading -->
      <div v-if="isLoading" class="space-y-6">
        <div class="h-28 animate-pulse rounded-2xl bg-white/80 dark:bg-gray-800/90" />
        <div class="grid gap-4 md:grid-cols-2">
          <div v-for="n in 4" :key="n" class="h-32 animate-pulse rounded-2xl bg-white/80 dark:bg-gray-800/90" />
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="loadError"
        class="rounded-2xl border border-red-200 bg-white/90 p-10 text-center dark:border-red-900 dark:bg-gray-800/90"
      >
        <p class="text-lg font-bold text-gray-900 dark:text-white">Unable to load special offers</p>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please check your connection and try again.
        </p>
        <button
          type="button"
          class="mt-6 rounded-full bg-[#ff8908] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
          @click="loadSpecialOffers"
        >
          Retry
        </button>
      </div>

      <div v-else class="space-y-10">
        <!-- Page header -->
        <header>
          <p class="text-xs font-extrabold uppercase tracking-[0.25em] text-[#ff8908]">
            Deals & Promotions
          </p>
          <h1 class="mt-2 text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white md:text-3xl">
            {{ hero?.title ?? 'Special Offers' }}
          </h1>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 md:text-base">
            {{ hero?.subtitle ?? 'Discover exclusive savings on pizzas, dippers, and combo meals.' }}
          </p>

          <div class="mt-6 grid grid-cols-3 gap-3 md:max-w-lg">
            <div
              v-for="stat in hero?.highlights ?? []"
              :key="stat.label"
              class="rounded-xl border border-white/70 bg-white/90 px-3 py-3 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800/90"
            >
              <p class="text-lg font-extrabold text-[#ff8908] md:text-xl">{{ stat.value }}</p>
              <p class="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 md:text-xs">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </header>

        <!-- Featured offer -->
        <article
          v-if="featuredOffer"
          class="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-[#ff8908] to-orange-600 p-5 shadow-md md:p-7"
        >
          <div class="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div class="max-w-xl text-white">
              <span class="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                Featured Deal
              </span>
              <h2 class="mt-3 text-xl font-extrabold md:text-2xl">{{ featuredOffer.title }}</h2>
              <p class="mt-2 text-sm leading-6 text-orange-50">{{ featuredOffer.description }}</p>

              <div class="mt-4 flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#ff8908]">
                  {{ featuredOffer.badge }}
                </span>
                <span v-if="featuredOffer.validUntil" class="text-xs text-orange-100">
                  Valid: {{ featuredOffer.validUntil }}
                </span>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <RouterLink
                  to="/browse-menu"
                  class="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#ff8908] transition hover:bg-orange-50"
                >
                  Order Now
                </RouterLink>
                <button
                  v-if="featuredOffer.promoCode"
                  type="button"
                  class="rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  @click="copyPromoCode(featuredOffer.promoCode)"
                >
                  {{ copiedCode === featuredOffer.promoCode ? 'Copied!' : `Code: ${featuredOffer.promoCode}` }}
                </button>
              </div>
            </div>

            <div class="mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-4 border-white/30 shadow-lg md:mx-0 md:h-44 md:w-44">
              <img
                :src="featuredOffer.imageUrl"
                :alt="featuredOffer.title"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </article>

        <!-- Section navigation -->
        <nav
          v-if="sections.length"
          class="flex flex-wrap gap-2 border-b border-gray-200/80 pb-4 dark:border-gray-700"
          aria-label="Offer categories"
        >
          <button
            v-for="section in sections"
            :key="section.id"
            type="button"
            class="rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition"
            :class="
              activeSectionId === section.id
                ? 'bg-[#ff8908] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            "
            @click="scrollToSection(section.id)"
          >
            {{ section.title }}
          </button>
        </nav>

        <!-- Offer sections -->
        <article
          v-for="section in sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-24 rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/85 md:p-6"
        >
          <div class="mb-5">
            <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff8908]">
              {{ section.items.length }} {{ section.items.length === 1 ? 'Offer' : 'Offers' }}
            </p>
            <h2 class="mt-1 text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl">
              {{ section.title }}
            </h2>
            <p v-if="section.subtitle" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ section.subtitle }}
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="item in section.items"
              :key="item.id"
              class="group flex gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/80"
            >
              <div class="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-28 md:w-28">
                <img
                  :src="item.imageUrl"
                  :alt="item.title"
                  class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div class="flex min-w-0 flex-1 flex-col">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-[#ff8908] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    {{ item.badge }}
                  </span>
                  <span class="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    {{ item.tag }}
                  </span>
                </div>

                <h3 class="mt-2 text-sm font-bold text-gray-900 dark:text-white md:text-base">
                  {{ item.title }}
                </h3>
                <p class="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  {{ item.description }}
                </p>

                <p v-if="item.validUntil" class="mt-2 text-[11px] font-medium text-gray-400">
                  Valid: {{ item.validUntil }}
                </p>

                <div class="mt-auto flex flex-wrap items-center gap-2 pt-3">
                  <RouterLink
                    to="/browse-menu"
                    class="rounded-full bg-[#111827] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#ff8908] dark:bg-gray-700"
                  >
                    Redeem
                  </RouterLink>

                  <button
                    v-if="item.promoCode"
                    type="button"
                    class="rounded-full border border-gray-200 px-3.5 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-[#ff8908] hover:text-[#ff8908] dark:border-gray-600 dark:text-gray-300"
                    @click="copyPromoCode(item.promoCode)"
                  >
                    {{ copiedCode === item.promoCode ? 'Copied!' : item.promoCode }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Info blocks -->
        <section>
          <div class="mb-5">
            <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff8908]">Need Help?</p>
            <h2 class="mt-1 text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl">
              Store Information
            </h2>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article
              v-for="block in infoBlocks"
              :key="block.id"
              class="rounded-2xl border p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
              :class="
                block.id === 'operational'
                  ? 'border-[#0b1438] bg-[#0b1438]/95 text-white'
                  : 'border-white/70 bg-white/90 text-gray-900 dark:border-gray-700 dark:bg-gray-800/90 dark:text-white'
              "
            >
              <div class="mb-3 flex items-center gap-2">
                <span class="text-xl" aria-hidden="true">{{ block.icon }}</span>
                <h3 class="text-sm font-extrabold">{{ block.title }}</h3>
              </div>
              <ul class="space-y-2">
                <li
                  v-for="line in block.lines"
                  :key="line"
                  class="text-xs leading-5"
                  :class="block.id === 'operational' ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'"
                >
                  {{ line }}
                </li>
              </ul>
            </article>
          </div>
        </section>

        <!-- Reviews -->
        <section class="rounded-2xl bg-[#ff8908]/95 p-5 shadow-sm md:p-7">
          <div class="mb-5 flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-950/70">
                Testimonials
              </p>
              <h3 class="mt-1 text-xl font-extrabold text-gray-950 md:text-2xl">Customer Reviews</h3>
            </div>

            <div v-if="reviews.length > 3" class="flex gap-2">
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-800 transition hover:bg-orange-50"
                aria-label="Previous review"
                @click="prevReview"
              >
                ‹
              </button>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-800 transition hover:bg-orange-50"
                aria-label="Next review"
                @click="nextReview"
              >
                ›
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article
              v-for="review in visibleReviews"
              :key="review.id"
              class="rounded-xl border border-orange-200/80 bg-white p-4 shadow-sm dark:border-orange-900 dark:bg-gray-900"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-bold text-gray-900 dark:text-white">{{ review.name }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ review.role }}</p>
                </div>
                <div class="flex items-center gap-0.5" :aria-label="`${review.rating} out of 5 stars`">
                  <span
                    v-for="star in 5"
                    :key="star"
                    class="text-sm"
                    :class="star <= review.rating ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'"
                  >
                    ★
                  </span>
                </div>
              </div>
              <p class="mt-3 text-xs leading-5 text-gray-600 dark:text-gray-300">{{ review.comment }}</p>
            </article>
          </div>
        </section>

        <!-- Bottom CTA -->
        <div
          class="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/90 p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800/90 md:flex-row md:text-left"
        >
          <div>
            <p class="text-lg font-extrabold text-gray-900 dark:text-white">
              Ready to save on your next order?
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Browse the full menu and apply promo codes at checkout.
            </p>
          </div>
          <div class="flex shrink-0 flex-wrap justify-center gap-3">
            <RouterLink
              to="/browse-menu"
              class="rounded-full bg-[#ff8908] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Browse Menu
            </RouterLink>
            <RouterLink
              to="/today-offers"
              class="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#ff8908] hover:text-[#ff8908] dark:border-gray-600 dark:text-gray-200"
            >
              Today's Offers
            </RouterLink>
          </div>
        </div>

        <p class="text-center text-xs text-gray-400 dark:text-gray-500">
          {{ totalOffers }} active offers · Terms and conditions apply to all promotions
        </p>
      </div>
    </div>
  </section>
</template>
