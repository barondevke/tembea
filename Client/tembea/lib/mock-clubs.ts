export interface TravelClub {
    id: number
    name: string
    description: string
    bio: string
    location: string
    memberCount: number
    category: string
    image: string
    whatsappLink: string
    founded: string
    activities: string[]
    nextTrip?: {
      destination: string
      date: string
      price: number
    }
  }
  
  export const MOCK_CLUBS: TravelClub[] = [
    {
      id: 1,
      name: "Adventure Seekers Club",
      description: "For thrill-seekers who love extreme sports and adventure travel",
      bio: "Adventure Seekers Club was founded in 2020 by a group of adrenaline junkies who wanted to share their passion for extreme travel experiences. We organize trips focused on activities like bungee jumping, skydiving, rock climbing, and white-water rafting. Our community is tight-knit and supportive, perfect for both beginners and experienced adventurers looking to push their limits while exploring the world's most exciting destinations.",
      location: "Global",
      memberCount: 1247,
      category: "Adventure",
      image: "/adventure-seekers.jpg",
      whatsappLink: "https://chat.whatsapp.com/adventure-seekers-demo",
      founded: "2020",
      activities: ["Bungee Jumping", "Skydiving", "Rock Climbing", "White-water Rafting", "Paragliding"],
      nextTrip: {
        destination: "New Zealand",
        date: "2024-04-15",
        price: 2899,
      },
    },
    {
      id: 2,
      name: "Backpacker Nomads",
      description: "Budget-friendly travel community for backpackers and digital nomads",
      bio: "Backpacker Nomads is a vibrant community of budget-conscious travelers who believe that amazing experiences don't have to break the bank. Founded in 2019, we've grown to become one of the largest backpacking communities, sharing tips on affordable accommodations, local transportation, and hidden gems. Whether you're a solo traveler, digital nomad, or just starting your backpacking journey, you'll find like-minded people ready to share their knowledge and maybe even become travel buddies.",
      location: "Worldwide",
      memberCount: 3456,
      category: "Budget Travel",
      image: "/placeholder.svg?height=300&width=400&text=Backpacker+Nomads",
      whatsappLink: "https://chat.whatsapp.com/backpacker-nomads-demo",
      founded: "2019",
      activities: [
        "Hostel Hopping",
        "Street Food Tours",
        "Local Transportation",
        "Cultural Immersion",
        "Budget Planning",
      ],
      nextTrip: {
        destination: "Southeast Asia Circuit",
        date: "2024-03-20",
        price: 899,
      },
    },
    {
      id: 3,
      name: "Luxury Wanderers",
      description: "Premium travel experiences for discerning travelers",
      bio: "Luxury Wanderers caters to travelers who appreciate the finer things in life. Established in 2018, our exclusive community focuses on high-end accommodations, Michelin-starred dining, private tours, and VIP experiences. We believe that luxury travel is about creating unforgettable memories through exceptional service and unique access to the world's most prestigious destinations. Our members enjoy curated experiences that money can't usually buy.",
      location: "Premium Destinations",
      memberCount: 567,
      category: "Luxury",
      image: "/placeholder.svg?height=300&width=400&text=Luxury+Wanderers",
      whatsappLink: "https://chat.whatsapp.com/luxury-wanderers-demo",
      founded: "2018",
      activities: ["5-Star Resorts", "Private Jets", "Michelin Dining", "VIP Tours", "Exclusive Events"],
      nextTrip: {
        destination: "Maldives Private Island",
        date: "2024-05-10",
        price: 8999,
      },
    },
    {
      id: 4,
      name: "Cultural Explorers",
      description: "Deep dive into local cultures, traditions, and authentic experiences",
      bio: "Cultural Explorers is dedicated to meaningful travel that goes beyond tourist attractions. Since 2021, we've been connecting travelers who want to truly understand the places they visit. Our trips focus on local traditions, authentic cuisine, traditional crafts, and genuine interactions with local communities. We partner with local guides and families to ensure our travel has a positive impact while providing our members with transformative cultural experiences.",
      location: "Cultural Hotspots",
      memberCount: 892,
      category: "Cultural",
      image: "/placeholder.svg?height=300&width=400&text=Cultural+Explorers",
      whatsappLink: "https://chat.whatsapp.com/cultural-explorers-demo",
      founded: "2021",
      activities: [
        "Local Homestays",
        "Cooking Classes",
        "Traditional Crafts",
        "Language Exchange",
        "Festival Participation",
      ],
      nextTrip: {
        destination: "Morocco Cultural Tour",
        date: "2024-04-05",
        price: 1599,
      },
    },
    {
      id: 5,
      name: "Solo Travelers Unite",
      description: "Supporting solo adventurers with group meetups and safety tips",
      bio: "Solo Travelers Unite was created in 2020 to support independent travelers who prefer to explore the world on their own terms. Our community provides a safe space for solo travelers to share experiences, get advice, and even meet up in various destinations. We organize regular meetups in major cities, provide safety resources, and maintain a supportive network where solo travelers can connect before, during, and after their journeys.",
      location: "Global Meetups",
      memberCount: 2134,
      category: "Solo Travel",
      image: "/placeholder.svg?height=300&width=400&text=Solo+Travelers",
      whatsappLink: "https://chat.whatsapp.com/solo-travelers-demo",
      founded: "2020",
      activities: [
        "City Meetups",
        "Safety Workshops",
        "Travel Buddy Matching",
        "Solo Dining Events",
        "Photography Walks",
      ],
      nextTrip: {
        destination: "Japan Solo Adventure",
        date: "2024-03-25",
        price: 2199,
      },
    },
    {
      id: 6,
      name: "Family Adventures",
      description: "Family-friendly travel with kids and multi-generational trips",
      bio: "Family Adventures specializes in creating memorable travel experiences for families of all sizes and ages. Founded in 2019 by parents who refused to let having children stop their travel dreams, we understand the unique challenges and joys of family travel. Our community shares practical tips, kid-friendly destinations, and organizes group trips where children can make friends while parents connect with other traveling families.",
      location: "Family Destinations",
      memberCount: 1678,
      category: "Family Travel",
      image: "/placeholder.svg?height=300&width=400&text=Family+Adventures",
      whatsappLink: "https://chat.whatsapp.com/family-adventures-demo",
      founded: "2019",
      activities: ["Kid-Friendly Tours", "Educational Trips", "Theme Parks", "Beach Resorts", "Multi-Gen Travel"],
      nextTrip: {
        destination: "Costa Rica Family Safari",
        date: "2024-06-15",
        price: 1899,
      },
    },
    {
      id: 8,
      name: "Eco Warriors Travel",
      description: "Sustainable and eco-friendly travel focused on conservation",
      bio: "Eco Warriors Travel is committed to responsible tourism that protects our planet's natural beauty. Established in 2021, we organize eco-friendly trips that support local conservation efforts and sustainable tourism practices. Our members are passionate about wildlife conservation, reducing travel carbon footprints, and supporting local communities. Every trip we organize includes educational components about environmental protection and opportunities to contribute to conservation projects.",
      location: "Conservation Areas",
      memberCount: 743,
      category: "Eco Travel",
      image: "/placeholder.svg?height=300&width=400&text=Eco+Warriors",
      whatsappLink: "https://chat.whatsapp.com/eco-warriors-demo",
      founded: "2021",
      activities: [
        "Wildlife Conservation",
        "Eco Lodges",
        "Carbon Offset Programs",
        "Beach Cleanups",
        "Sustainable Tourism",
      ],
      nextTrip: {
        destination: "Galapagos Conservation Trip",
        date: "2024-05-20",
        price: 3299,
      },
    },
    {
      id: 9,
      name: "Foodie Travelers",
      description: "Culinary adventures and food-focused travel experiences",
      bio: "Foodie Travelers brings together passionate food lovers who believe that cuisine is the best way to understand a culture. Since 2020, we've been organizing culinary adventures that go beyond restaurant visits to include cooking classes with local chefs, market tours, wine tastings, and food festivals. Our community shares restaurant recommendations, recipes from travels, and organizes food-focused meetups in cities around the world.",
      location: "Culinary Destinations",
      memberCount: 1523,
      category: "Food & Wine",
      image: "/placeholder.svg?height=300&width=400&text=Foodie+Travelers",
      whatsappLink: "https://chat.whatsapp.com/foodie-travelers-demo",
      founded: "2020",
      activities: ["Cooking Classes", "Wine Tastings", "Food Markets", "Restaurant Tours", "Culinary Festivals"],
      nextTrip: {
        destination: "Italy Culinary Tour",
        date: "2024-04-30",
        price: 2599,
      },
    },
  ]
  