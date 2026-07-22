import { computed, ref } from 'vue'
import type { CartItem, CartProductLike } from '../types/cart'

const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)
const deliveryFee = 100
const discount = ref(0)

const toFiniteNumber = (value: unknown): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value !== 'string') return 0

  const normalized = value.replace(/,/g, '')
  const numericPart = normalized.match(/-?\d+(?:\.\d+)?/g)?.[0]
  if (!numericPart) return 0

  const parsed = Number(numericPart)
  return Number.isFinite(parsed) ? parsed : 0
}

const sanitizeQuantity = (quantity: unknown): number => {
  return Math.max(1, Math.trunc(toFiniteNumber(quantity)))
}

const getProductId = (product: CartProductLike): number | string => {
  if (typeof product.id === 'number' || typeof product.id === 'string') return product.id
  return product.title || product.name || `item-${Date.now()}`
}

const getProductName = (product: CartProductLike): string => {
  return product.title || product.name || 'Food Item'
}

const getProductNote = (product: CartProductLike): string => {
  if (typeof product.description === 'string' && product.description.trim()) {
    return product.description
  }
  return 'Prepared fresh on order'
}

const getProductImage = (product: CartProductLike): string => {
  if (Array.isArray(product.images)) {
    const firstImage = product.images.find(
      (img): img is string => typeof img === 'string' && img.trim().length > 0,
    )
    if (firstImage) return firstImage
  }

  if (typeof product.imageUrl === 'string' && product.imageUrl.trim()) return product.imageUrl
  if (typeof product.image === 'string' && product.image.trim()) return product.image
  return 'https://placehold.co/120x120?text=Food'
}

const getProductPrice = (product: CartProductLike): number => {
  const price = toFiniteNumber(product.price)
  if (price > 0) return price
  return toFiniteNumber(product.badge)
}

const openCart = () => {
  isCartOpen.value = true
}

const closeCart = () => {
  isCartOpen.value = false
}

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
}

const addToCart = (product: CartProductLike, quantity: number) => {
  const id = getProductId(product)
  const qtyToAdd = sanitizeQuantity(quantity)
  const existingItem = cartItems.value.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity = sanitizeQuantity(existingItem.quantity + qtyToAdd)
    return
  }

  cartItems.value.push({
    id,
    name: getProductName(product),
    note: getProductNote(product),
    price: getProductPrice(product),
    quantity: qtyToAdd,
    image: getProductImage(product),
  })
}

const removeItem = (itemId: number | string) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== itemId)
}

const updateQuantity = (payload: { id: number | string; quantity: number }) => {
  const item = cartItems.value.find((entry) => entry.id === payload.id)
  if (!item) return
  item.quantity = sanitizeQuantity(payload.quantity)
}

const clearCart = () => {
  cartItems.value = []
}

const cartCount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + sanitizeQuantity(item.quantity), 0)
})

export const useCart = () => ({
  cartItems,
  isCartOpen,
  deliveryFee,
  discount,
  cartCount,
  openCart,
  closeCart,
  toggleCart,
  addToCart,
  removeItem,
  updateQuantity,
  clearCart,
})
