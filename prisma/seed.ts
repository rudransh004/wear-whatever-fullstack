import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding all WearWhatever products...')

  // Cleanup existing data to prevent duplicates
  await prisma.product.deleteMany()

  const baseUrl = "https://mqtaafuvnujrqcmuqvsx.supabase.co/storage/v1/object/public/product-images/product-images";
  
  // High-quality placeholders so your carousel works immediately
  const placeholder1 = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800";
  const placeholder2 = "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800";
  const placeholder3 = "https://images.unsplash.com/photo-1571119816306-c0c00469dc2f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const products = [
    {
      name: "Cyberpunk Oversized Tee",
      description: "Heavyweight cotton with a futuristic neon aesthetic.",
      price: 799,
      category: "Oversized",
      // FIXED: Added multiple images separated by commas
      images: [placeholder3, placeholder1, placeholder2], 
      isAiEnabled: false
    },
    {
      name: "All Die I Will Alive",
      description: "Bold graphic statement tee from the WearWhatever legacy collection.",
      price: 749,
      category: "Graphic",
      images: [`${baseUrl}/All_die_I_ll_alive/front.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Anime Girl Edition",
      description: "Custom illustrated anime aesthetic for the modern otaku.",
      price: 699,
      category: "Anime",
      images: [`${baseUrl}/Anime_girl/girl_anime_frame_4.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Astronaut Edition",
      description: "Space-themed minimalist design exploring the digital frontier.",
      price: 849,
      category: "Astronaut_Edition",
      images: [`${baseUrl}/Astronaut_Edition/Astronuat_Black_2.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Billie Eilish Tribute",
      description: "Streetwear inspired by the iconic style of Billie Eilish.",
      price: 799,
      category: "Artist",
      images: [`${baseUrl}/BILLIE_EILISH/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "BOBB Graphic Tee",
      description: "Unique character design from the BOBB collection.",
      price: 799,
      category: "Graphic",
      images: [`${baseUrl}/BOBB/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Boy Anime Concept",
      description: "Sleek boy anime character illustration on premium fabric.",
      price: 849,
      category: "Anime",
      images: [`${baseUrl}/Boy_Anime/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "BTH Signature",
      description: "Modern typography and abstract elements.",
      price: 699,
      category: "Minimalist",
      images: [`${baseUrl}/BTH/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "California Dreamin'",
      description: "West-coast inspired aesthetic with a summer vibe.",
      price: 799,
      category: "Lifestyle",
      images: [`${baseUrl}/California/california.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Chill Pill Essential",
      description: "Take a break with this relaxed-fit graphic tee.",
      price: 649,
      category: "Essential",
      images: [`${baseUrl}/CHILL_PILL/main.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Crop Top Kitty",
      description: "Playful cat illustration on a premium crop top cut.",
      price: 599,
      category: "Crop Top",
      images: [`${baseUrl}/crop_top_KITTY/main.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Dino Vintage",
      description: "Retro dinosaur illustration for a nostalgic look.",
      price: 699,
      category: "Vintage",
      images: [`${baseUrl}/DINO/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Donald Brooklyn",
      description: "Brooklyn-style urban design with a character twist.",
      price: 749,
      category: "Urban",
      images: [`${baseUrl}/DONALD_BROOKLYN/main.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Follow Your Dream",
      description: "Inspirational typography on high-performance apparel.",
      price: 599,
      category: "Essential",
      images: [`${baseUrl}/FOLLOW_YOUR_DREAM/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Just Psych",
      description: "Psychological and abstract visual patterns.",
      price: 999,
      category: "Abstract",
      images: [`${baseUrl}/JUST_PSYCH/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Kathak Heritage",
      description: "Celebrating traditional Indian dance with a modern fit.",
      price: 699,
      category: "Heritage",
      images: [`${baseUrl}/Kathak/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Looking of Ghost",
      description: "Ethereal and spooky graphic for the bold.",
      price: 699,
      category: "Graphic",
      images: [`${baseUrl}/Looking_of_ghost/main.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Minions Mania",
      description: "Vibrant yellow fun in the signature WearWhatever style.",
      price: 599,
      category: "Graphic",
      images: [`${baseUrl}/MINIONS/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Music Dance Funky",
      description: "Feel the beat with this funky music-inspired tee.",
      price: 949,
      category: "Music",
      images: [`${baseUrl}/Music_Dance_funky/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Obsession Premium",
      description: "Deep aesthetic design for those with an eye for detail.",
      price: 799,
      category: "Premium",
      images: [`${baseUrl}/Obsession/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Paper Chaser",
      description: "Urban streetwear for the focused and driven.",
      price: 799,
      category: "Urban",
      images: [`${baseUrl}/Paper_Chaser/main.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Paris Aesthetic",
      description: "European minimalist vibes on high-quality fabric.",
      price: 1999,
      category: "Lifestyle",
      images: [`${baseUrl}/PARIS/main.png`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Peaky Blinder Original",
      description: "By order of the WearWhatever crew.",
      price: 999,
      category: "Peaky_Blinder",
      images: [`${baseUrl}/PEAKY_BLINDER/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Porsche GT Edition",
      description: "Automotive excellence meets streetwear performance.",
      price: 999,
      category: "Automotive",
      images: [`${baseUrl}/Porshe_gt/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Ride or Die",
      description: "Tough aesthetic for the road-ready soul.",
      price: 599,
      category: "Graphic",
      images: [`${baseUrl}/Ride/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Shinchan Retro",
      description: "Everyone's favorite mischievous character in a new style.",
      price: 599,
      category: "Graphic",
      images: [`${baseUrl}/Shinchan/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Space Edition: Infinity",
      description: "Exploring the depths of the universe in comfort.",
      price: 799,
      category: "Space_edition",
      images: [`${baseUrl}/space_edition/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Super Cars Collection",
      description: "High-octane design for car enthusiasts.",
      price: 749,
      category: "Automotive",
      images: [`${baseUrl}/SUPER_CARS/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    },
    {
      name: "Taylor Swift: The Eras",
      description: "Inspired by the journey of an icon.",
      price: 599,
      category: "Artist",
      images: [`${baseUrl}/Taylor_Swift_edition/main.jpg`, placeholder1, placeholder2],
      isAiEnabled: false
    }
  ]

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product: ${product.name} (id: ${product.id})`)
  }

  console.log('Seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })