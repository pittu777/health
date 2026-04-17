import { faker } from "@faker-js/faker";

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
}

const categories: ProductCategory[] = ["Electronics", "Clothing", "Home"];
const brands = ["Astra", "Nexa", "Luma", "Orbit", "Cairo", "Velo"];

faker.seed(54231);

const images = [
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516405513672-8b1cd4b6ce64?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
];

function randomProductName(category: ProductCategory) {
    if (category === "Electronics") {
        return faker.commerce.productName();
    }
    if (category === "Clothing") {
        return `${faker.color.human()} ${faker.commerce.productMaterial()} Tee`;
    }
    return `${faker.commerce.productAdjective()} ${faker.commerce.product()}`;
}

export const products: Product[] = Array.from({ length: 12 }, (_, index) => {
    const category = faker.helpers.arrayElement(categories);
    const brand = faker.helpers.arrayElement(brands);
    const price = Number(faker.commerce.price(19, 799, 0));
    return {
        id: faker.string.uuid(),
        name: randomProductName(category),
        category,
        brand,
        price,
        description: faker.commerce.productDescription(),
        image: images[index % images.length],
        rating: Number((faker.number.float({ min: 3, max: 5, precision: 0.1 })).toFixed(1)),
    };
});

export function getProductById(id: string) {
    return products.find((product) => product.id === id);
}

export function getUniqueCategories() {
    return Array.from(new Set(products.map((product) => product.category)));
}

export function getUniqueBrands() {
    return Array.from(new Set(products.map((product) => product.brand)));
}
