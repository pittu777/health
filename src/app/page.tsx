
import ProductListingClient from "@/components/ProductListingClient";
import { products } from "@/lib/products";

export default function HomePage() {
  return <ProductListingClient products={products} />;
}
