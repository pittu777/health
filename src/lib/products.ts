export type ProductCategory = "Electronics" | "Clothing" | "Home";

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    brand: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    featured?: boolean;
}

export const products: Product[] = [
    {
        id: "running-shoes",
        name: "Running Shoes",
        category: "Clothing",
        brand: "Astra",
        price: 99,
        description: "Lightweight daily trainers built for comfort, grip, and all-day movement.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        rating: 4.6,
    },
    {
        id: "wireless-headphones",
        name: "Wireless Headphones",
        category: "Electronics",
        brand: "Nexa",
        price: 99,
        description: "Immersive wireless audio with soft ear cushions and long battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        rating: 4.7,
    },
    {
        id: "backpack",
        name: "Backpack",
        category: "Home",
        brand: "Orbit",
        price: 129,
        description: "A structured backpack with daily storage for work, travel, and essentials.",
        image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80",
        rating: 4.5,
    },
    {
        id: "smartwatch",
        name: "Smartwatch",
        category: "Electronics",
        brand: "Luma",
        price: 249,
        description: "Track activity, notifications, and health stats from a sleek wrist display.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
        rating: 4.8,
    },
    {
        id: "sunglasses",
        name: "Sunglasses",
        category: "Clothing",
        brand: "Cairo",
        price: 149,
        description: "Classic shades with a lightweight frame and everyday UV protection.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
        rating: 4.4,
    },
    {
        id: "digital-camera",
        name: "Digital Camera",
        category: "Electronics",
        brand: "Velo",
        price: 499,
        description: "Capture sharp photos with a compact camera designed for travel and content.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        rating: 4.9,
    },
    {
        id: "tshirt",
        name: "T-shirt",
        category: "Clothing",
        brand: "Astra",
        price: 29,
        description: "A clean everyday tee in a relaxed cut with breathable cotton comfort.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        rating: 4.3,
    },
    {
        id: "smartphone",
        name: "Smartphone",
        category: "Electronics",
        brand: "Nexa",
        price: 699,
        description: "Lorem ipsum dolor amet, consectetur euisagend. A polished smartphone built for speed and clarity.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
        rating: 4.9,
        featured: true,
    },
];

export function getProductById(id: string) {
    return products.find((product) => product.id === id);
}

export function getUniqueCategories() {
    return Array.from(new Set(products.map((product) => product.category)));
}

export function getUniqueBrands() {
    return Array.from(new Set(products.map((product) => product.brand)));
}
