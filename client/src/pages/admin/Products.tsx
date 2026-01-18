import AdminMenu from "@/components/admin/AdminMenu";
import ProductCard from "@/components/admin/products/ProductCard";
import { useGetAllProductsQuery } from "@/store/slices/api/productApi";

const Products = () => {
  const { data, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <AdminMenu>
      <h2 className="text-2xl text-center font-semibold mb-6">
        All Products List
      </h2>

      {data?.products && data?.products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center h-screen text-muted-foreground">
          No products found
        </p>
      )}
    </AdminMenu>
  );
};

export default Products;
