"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

type signUpInputs = {
  username: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpInputs>();
  const router = useRouter();

  const onSubmitHandler = async (data: signUpInputs) => {
    try {
      console.log(data);
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
        credentials: "include", // ✅ include cookies in request and response
      });
      if (!response.ok) {
        throw new Error("Failed to SignUp");
      }
      //redirect upon successful SignUp
      router.push("/");
    } catch (error) {
      alert("Something Went Wrong");
      console.error(error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Card className="w-full max-w-sm py-12">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter the following details to create your account
          </CardDescription>
          <CardAction>
            <Link href={"/login"}>
              <Button variant="link" className="cursor-pointer">
                Login Instead
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a unique Username"
                  required
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.type === "required" &&
                      "username is required."}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  {...register("name", { required: true, maxLength: 100 })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.type === "required" && "name is required."}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.type === "required" && "email is required."}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="m@example.com"
                  required
                  {...register("phone", { required: true, maxLength: 10 })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.type === "maxLength" &&
                      "Max length is 10 characters."}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.type === "required" && "Name is required."}
                  </p>
                )}
              </div>
            </div>
            <CardFooter className="flex-col gap-2 my-3 p-2">
              <Button type="submit" className="w-full cursor-pointer">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                Sign Up with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SignUp;
