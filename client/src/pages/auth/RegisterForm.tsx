import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { registerSchema } from "@/schema/authSchema";
import { Link, useNavigate } from "react-router";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useRegisterMutation } from "@/store/slices/api/userApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type formInput = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<formInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      answer: "",
    },
  });

  async function onSubmitHandler(values: z.infer<typeof registerSchema>) {
    try {
      await registerMutation(values).unwrap();
      form.reset();
      toast.success("User registered successfully.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Register error", error);
    }
  }

  return (
    <section className="flex justify-center items-center my-10">
      <div className="w-2/3 md:w-1/3 mx-auto border-2 border-gray-300 p-8 rounded-md">
        <h2 className="font-bold text-center mb-2">E-Commerce.COM</h2>
        <p className="text-sm font-medium text-gray-400 text-center">
          Enter your information to register.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mt-6 space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your_name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@eshop.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      required
                      inputMode="numeric"
                      // minLength={8}
                      // maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Answer */}
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="What is Your Favorite sports" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-lg active:scale-95 duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white size-5" />
                  <span className="animate-pulse">Submitting...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
