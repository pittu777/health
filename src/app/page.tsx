import ProductListingClient from "@/feature/products/components/ProductListingClient";
import { products } from "@/lib/products";

export default function HomePage() {
  return <ProductListingClient products={products} />;
}
