import AdminMenu from "@/components/admin/AdminMenu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/product.schema";
import type z from "zod";
import { useNavigate, useParams } from "react-router";
import {
  useGetProductPhotoByIdQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/store/slices/api/productApi";
import { useGetAllCategoriesQuery } from "@/store/slices/api/categoryApi";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImgTypes {
  url: string;
  public_alt: string;
}

type formInput = z.infer<typeof productSchema>;

const UpdateProduct = () => {
  const { slug } = useParams();
  const { data: getAllCategories } = useGetAllCategoriesQuery();
  const { data: singleProduct } = useGetSingleProductQuery(String(slug));

  const [updateProductMutation, { isLoading: isLoadingUpdateProduct }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  const {
    _id: productId,
    name,
    description,
    price,
    quantity,
    category,
    shipping,
  } = singleProduct?.product || {};

  const { data: singlePhoto } = useGetProductPhotoByIdQuery(productId!);

  const form = useForm<formInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
      price: price || 0,
      quantity: quantity || 0,
      category: category ? category?._id : "",
      shipping:
        shipping !== undefined
          ? (String(shipping) as "true" | "false")
          : undefined,
      photo:
        singlePhoto && singlePhoto?.product
          ? singlePhoto?.product.map((p) => ({
              url: p.url,
              public_alt: p.public_alt!,
            }))
          : [],
    },
  });

  useEffect(() => {
    if (singleProduct?.product) {
      const p = singleProduct.product;

      const existingPhotos = singlePhoto?.product
        ? singlePhoto.product.map((img: ImgTypes) => ({
            url: img.url,
            public_alt: img.public_alt || "",
          }))
        : [];

      form.reset({
        name: p.name || "",
        description: p.description || "",
        price: p.price || 0,
        quantity: p.quantity || 0,
        category: p.category?._id || "",
        shipping: p.shipping ? "true" : "false",
        photo: existingPhotos,
      });
    }
  }, [singleProduct, singlePhoto, form]);

  const onSubmit: SubmitHandler<formInput> = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("quantity", values.quantity.toString());
    formData.append("category", values.category);
    formData.append("shipping", values.shipping);
    values.photo.forEach((img) => {
      if (img.file) {
        formData.append("photo", img.file as File);
      }
    });

    try {
      const response = await updateProductMutation({
        id: productId!,
        formData,
      }).unwrap();
      form.reset();
      navigate("/dashboard/admin/products");
      toast.success(response.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.error("Product update failed:", err);
    }
  };

  return (
    <AdminMenu>
      <h1 className="text-2xl font-semibold mb-6">Update Product</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-6 bg-white p-6 rounded-xl shadow"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getAllCategories?.categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Shipping */}
          <FormField
            control={form.control}
            name="shipping"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping</FormLabel>
                <Select
                  value={field.value ?? "false"}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Shipping?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Photos */}
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <ImageUpload photos={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoadingUpdateProduct}
            className="cursor-pointer rounded-lg active:scale-95 duration-200"
          >
            {isLoadingUpdateProduct ? (
              <>
                <Loader2 className="animate-spin text-white size-5" />
                <span className="animate-pulse">Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </AdminMenu>
  );
};

export default UpdateProduct;
