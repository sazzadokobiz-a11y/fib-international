export interface Product {
  _id: number
  name: string
  image: string
  images: string[]
  description: string
  brand: string
  materials: string[]
  color: string
  size: string
  gender: string
  category: string
  moq: number
  slug: string
}

export const products: Product[] = [
  {
    _id: 1,
    name: "Agricultural Commodities",
    image: "https://images.unsplash.com/photo-1634671495693-4036d23f0754",
    images: [
      'https://images.unsplash.com/photo-1634671495693-4036d23f0754?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1634671495197-fb9ec3230ef5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1643226354613-260043e30011?q=80&w=671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1634671495197-fb9ec3230ef5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    description: "Premium grains sourced globally.",
    brand: "Global Harvest Exports",
    materials: ["Wheat", "Corn", "Rice"],
    color: "Natural",
    size: "Bulk",
    gender: "Unisex",
    category: "Agriculture",
    moq: 5000,
    slug: "agricultural-commodities",
  },
  {
    _id: 2,
    name: "Textiles & Garments",
    image: "https://images.unsplash.com/photo-1666723043169-22e29545675c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      'https://images.unsplash.com/photo-1660945671777-6389d37d6ab4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603139835562-32d47f7fdae6?q=80&w=690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1636572465767-1e0a977da3fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603139835562-32d47f7fdae6?q=80&w=690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    description: "High-quality garments for export.",
    brand: "Global Harvest Exports",
    materials: ["Cotton", "Denim"],
    color: "Various",
    size: "All Sizes",
    gender: "Unisex",
    category: "Textiles",
    moq: 1000,
    slug: "textiles-garments",
  },
  {
    _id: 3,
    name: "Industrial Components",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      'https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603504567672-bc39a18c3371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
      'https://images.unsplash.com/photo-1680039211156-66c721b87625?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    description: "Precision engineered industrial parts.",
    brand: "Global Harvest Exports",
    materials: ["Steel", "Alloy"],
    color: "Metallic",
    size: "Custom",
    gender: "Unisex",
    category: "Industrial",
    moq: 500,
    slug: "industrial-components",
  },
  {
    _id: 4,
    name: "Raw Materials",
    image: "https://images.unsplash.com/photo-1720534490358-bc2ad29d51d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FwfGVufDB8fDB8fHww",
    images: [
      'https://images.unsplash.com/photo-1591818343198-4ff334074580?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1517941823-815bea90d291?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcHxlbnwwfHwwfHx8MA%3D%3D'
    ],
    description: "Ethically sourced raw materials.",
    brand: "Global Harvest Exports",
    materials: ["Wood", "Fibers"],
    color: "Natural",
    size: "Bulk",
    gender: "Unisex",
    category: "Raw Materials",
    moq: 10000,
    slug: "raw-materials",
  },
  {
    _id: 5,
    name: "Leather Bags",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      'https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1603504567672-bc39a18c3371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D',
      'https://images.unsplash.com/photo-1680039211156-66c721b87625?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8',
      'https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    description: "Premium handcrafted leather bags.",
    brand: "Global Harvest Exports",
    materials: ["Leather"],
    color: "Brown",
    size: "Standard",
    gender: "Unisex",
    category: "Leather",
    moq: 300,
    slug: "leather-bags",
  },
  {
    _id: 6,
    name: "Jute Products",
    image: "https://images.unsplash.com/photo-1720534490358-bc2ad29d51d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FwfGVufDB8fDB8fHww",
    images: [
      'https://images.unsplash.com/photo-1591818343198-4ff334074580?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcHxlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1517941823-815bea90d291?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcHxlbnwwfHwwfHx8MA%3D%3D'
    ],
    description: "Eco-friendly jute solutions.",
    brand: "Global Harvest Exports",
    materials: ["Jute"],
    color: "Natural",
    size: "Various",
    gender: "Unisex",
    category: "Textiles",
    moq: 2000,
    slug: "jute-products",
  }
]
