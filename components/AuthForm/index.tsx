"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signInSchema from "@/schemas/Auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "../CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const schema = signInSchema(type);
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      {
        /* //TODO: Signup with appwrite and get plaid link token */
        if (type === "sign-up") {
          const newUser = await signUp(data);
          setUser(newUser);
        }
        if (type === "sign-in") {
          const response = await signIn({
            email: data.email,
            password: data.password,
          });
          console.log(response);
          if (response) {
            router.push("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Bank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-up" ? "Sign Up" : "Sign In"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* //TODO: Add Plaid Link Account */}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex  gap-4">
                    <CustomInput
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                      type="text"
                      control={form.control}
                    />
                    <CustomInput
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                      type="text"
                      control={form.control}
                    />
                  </div>
                  <CustomInput
                    label="Address"
                    name="address"
                    placeholder="Enter your specific address"
                    type="text"
                    control={form.control}
                  />
                  <div className="flex  gap-4">
                    <CustomInput
                      label="State"
                      name="state"
                      placeholder="Ex: NY"
                      type="text"
                      control={form.control}
                    />
                    <CustomInput
                      label="Postal Code"
                      name="postalCode"
                      placeholder="Ex: 12345"
                      type="text"
                      control={form.control}
                    />
                  </div>
                  <div className="flex  gap-4">
                    <CustomInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                      type="text"
                      control={form.control}
                    />
                    <CustomInput
                      label="SSN"
                      name="ssn"
                      placeholder="Ex: 1234"
                      type="text"
                      control={form.control}
                    />
                  </div>
                </>
              )}
              <CustomInput
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                control={form.control}
              />
              <CustomInput
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                control={form.control}
              />
              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} className="form-btn" type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-up" ? (
                    "Sign Up"
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
