import { productDetailsById, type ProductDetailFields } from './productDetails'
import type { CartProductLike } from '../types/cart'

export type OfferFoodItem = CartProductLike &
  ProductDetailFields & {
    id: number
    title: string
    badge: string
    originalBadge: string
    offerLabel: string
    imageUrl: string
    price: number
  }

export type FoodOfferCampaign = {
  id: string
  tag: string
  title: string
  discountPercent: number
  productIds: number[]
}

const productTitles: Record<number, string> = {
  5: 'Mango Banana Smoothie',
  6: 'Wood-Fired Veg Pizza',
  7: 'Street-Style Chicken Wrap',
  12: 'Crispy Chicken Burger',
  13: 'Creamy Mushroom Pasta',
  15: 'Fresh Lime Mojito',
}

export const getBasePrice = (id: number): number => 800 + id * 120

export const buildOfferFoodItem = (id: number, discountPercent: number): OfferFoodItem => {
  const originalPrice = getBasePrice(id)
  const offerPrice = Math.round(originalPrice * (1 - discountPercent / 100))

  return {
    ...productDetailsById[id],
    id,
    title: productTitles[id] || `Food Item ${id}`,
    originalBadge: `Rs. ${originalPrice}`,
    badge: `Rs. ${offerPrice}`,
    offerLabel: `${discountPercent}% OFF`,
    price: offerPrice,
    imageUrl: `https://cdn.dummyjson.com/recipe-images/${id}.webp`,
  }
}

export const foodOfferCampaigns: FoodOfferCampaign[] = [
  {
    id: 'burger-pizza-deal',
    tag: '20% OFF Today',
    title: 'Save on Burger & Pizza\nOrder now at special prices',
    discountPercent: 20,
    productIds: [12, 6],
  },
  {
    id: 'drinks-deal',
    tag: '15% OFF Beverages',
    title: 'Smoothie & Mojito deals\nEnjoy chilled drinks for less',
    discountPercent: 15,
    productIds: [5, 15],
  },
]

export const getOfferFoodsByCampaign = (campaignId: string): OfferFoodItem[] => {
  const campaign = foodOfferCampaigns.find((entry) => entry.id === campaignId)
  if (!campaign) return []

  return campaign.productIds.map((id) => buildOfferFoodItem(id, campaign.discountPercent))
}

export const getAllOfferFoods = (): OfferFoodItem[] => {
  const items = new Map<number, OfferFoodItem>()

  for (const campaign of foodOfferCampaigns) {
    for (const id of campaign.productIds) {
      items.set(id, buildOfferFoodItem(id, campaign.discountPercent))
    }
  }

  return Array.from(items.values())
}

export const getCampaignById = (campaignId: string): FoodOfferCampaign | undefined => {
  return foodOfferCampaigns.find((entry) => entry.id === campaignId)
}
