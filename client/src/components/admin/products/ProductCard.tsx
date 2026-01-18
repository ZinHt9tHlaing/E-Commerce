import {
  useDeleteProductMutation,
  useGetProductPhotoByIdQuery,
} from "@/store/slices/api/productApi";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { data, isLoading, isError } = useGetProductPhotoByIdQuery(product._id);
  const [deleteProductMutation, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();
  const singlePhoto = data?.product?.length ? data.product[0] : null;

  if (isError) {
    return <div className="text-center text-red-500">Failed to load image</div>;
  }

  const handleDeleteProduct = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    try {
      await deleteProductMutation(product._id).unwrap();
      toast.success("Product deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center p-4">Loading image...</div>
      ) : !singlePhoto ? (
        <div className="text-center p-4 text-gray-500">
          No product image available
        </div>
      ) : (
        <Card className="overflow-hidden p-2 mb-5">
          <div className="relative w-full aspect-[4/3] bg-gray-100">
            {isLoading ? (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            ) : (
              <img
                src={singlePhoto?.url}
                alt={singlePhoto?.public_alt}
                className="absolute inset-0 w-full h-full object-cover rounded-md hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out"
              />
            )}
          </div>

          <Separator />

          <CardHeader className="text-start px-2">
            <CardTitle className="text-base line-clamp-1">
              {product.name}
            </CardTitle>

            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
          </CardHeader>

          <div className="px-2 pb-2 flex justify-end gap-2">
            <Button
              size="sm"
              className="sm:w-auto cursor-pointer flex items-center gap-2 active:scale-95 duration-150"
            >
              <SquarePen className="h-4 w-4" />
              <Link to={`/dashboard/admin/product/${product.slug}`}>Edit</Link>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              disabled={isLoadingDeleteProduct}
              className="sm:w-auto cursor-pointer flex items-center gap-2 active:scale-95 duration-150"
              onClick={handleDeleteProduct}
            >
              <Trash2 className="h-4 w-4" />
              {isLoadingDeleteProduct ? (
                <span className="animate-pulse">Deleting...</span>
              ) : (
                <span>Delete</span>
              )}
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ProductCard;
