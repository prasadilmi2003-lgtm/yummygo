import { productDetailsById, type ProductDetailFields } from './productDetails'
import type { CartProductLike } from '../types/cart'

export type PopularFoodItem = CartProductLike &
  ProductDetailFields & {
    id: number
    title: string
    badge: string
    imageUrl: string
  }

const buildItem = (id: number, title: string): PopularFoodItem => ({
  ...productDetailsById[id],
  id,
  title,
  badge: `Rs. ${800 + id * 120}`,
  imageUrl: `https://cdn.dummyjson.com/recipe-images/${id}.webp`,
})

export const popularFoodItems: PopularFoodItem[] = [
  buildItem(12, 'Crispy Chicken Burger'),
  buildItem(18, 'Signature Falafel Platter'),
  buildItem(13, 'Creamy Mushroom Pasta'),
  buildItem(6, 'Wood-Fired Veg Pizza'),
  buildItem(5, 'Mango Banana Smoothie'),
  buildItem(1, 'Garlic Soy Noodle Bowl'),
]
