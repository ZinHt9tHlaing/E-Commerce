import AdminMenu from "@/components/admin/AdminMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useCreateProductMutation } from "@/store/slices/api/productApi";
import { useGetAllCategoriesQuery } from "@/store/slices/api/categoryApi";
import { createProductSchema } from "@/schema/product.schema";
import type z from "zod";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { Loader2 } from "lucide-react";

type formInput = z.infer<typeof createProductSchema>;

const CreateProduct = () => {
  const { data } = useGetAllCategoriesQuery();
  const [createProductMutation, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();

  const form = useForm<formInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      shipping: "false",
      photo: [],
    },
  });

  const onSubmit: SubmitHandler<formInput> = async (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", String(values.price));
    formData.append("quantity", String(values.quantity));
    formData.append("category", values.category);
    formData.append("shipping", values.shipping);

    values.photo.forEach((img) => {
      if (img.file) {
        formData.append("photo", img.file as File);
      }
    });

    try {
      const response = await createProductMutation(formData).unwrap();
      form.reset();
      toast.success(response.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.error("Product creation failed:", err);
    }
  };

  return (
    <AdminMenu>
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>

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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.categories.map((cat) => (
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
                <Select onValueChange={field.onChange}>
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
            disabled={isLoadingCreateProduct}
            className="w-full cursor-pointer rounded-lg active:scale-95 duration-200"
          >
            {isLoadingCreateProduct ? (
              <>
                <Loader2 className="animate-spin text-white size-5" />
                <span className="animate-pulse">Creating...</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </AdminMenu>
  );
};

export default CreateProduct;
