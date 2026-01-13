import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCategorySchema } from "@/schema/categorySchema";
import { useCreateCategoryMutation } from "@/store/slices/api/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";

const CategoryForm = () => {
  const [createCategoryMutation, { isLoading: createCategoryLoading }] =
    useCreateCategoryMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createCategorySchema>) {
    try {
      await createCategoryMutation(values).unwrap();
      form.reset();
      toast.success("User registered successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Register error", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={createCategoryLoading}
            className="rounded-lg active:scale-95 duration-100 flex items-center justify-center md:mt-0"
          >
            {createCategoryLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span className="animate-pulse">Creating...</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
