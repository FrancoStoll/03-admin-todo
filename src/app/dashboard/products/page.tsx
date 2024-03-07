import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export default function ProductsPage() {
  return (
    <div className="grid grid-col-1 sm:grid-cols-3 gap-2">


      {/* Product Card */}
      {
        products.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))
      }
    </div>
  );
}