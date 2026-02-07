import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // Cleanup existing data to prevent duplicates
  await prisma.product.deleteMany()

  const products = [
    {
      name: "Cyberpunk Oversized Tee",
      description: "Heavyweight cotton with a futuristic neon aesthetic.",
      price: 1299.00,
      category: "Oversized",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
      isAiEnabled: false
    },
    {
      name: "AI Generated: Abstract Dreams",
      description: "A unique pattern created by our custom Diffusion model.",
      price: 1499.00,
      category: "AI Edition",
      images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"],
      isAiEnabled: true
    },
    {
      name: "Minimalist 'Whatever' Script",
      description: "Clean, simple, and essential for every wardrobe.",
      price: 899.00,
      category: "Essential",
      images: ["https://images.unsplash.com/photo-1554568212-3c1630c92144"],
      isAiEnabled: false
    }
  ]

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })