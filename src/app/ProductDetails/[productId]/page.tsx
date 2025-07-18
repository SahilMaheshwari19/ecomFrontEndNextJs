"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Product } from "@/types/ProductList";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    axios
      .get<Product>(`http://localhost:8080/api/products/${productId}`)
      .then((response) => {
        setProductDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching product with product id : ",
          productId,
          error
        );
        setLoading(false);
      });
  }, [productId]); // run only when id changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-purple-600 animate-pulse">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </p>
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">Product not found.</p>
      </div>
    );
  }
  return (
    <section
      id="details"
      className="bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 min-h-screen pt-28 pb-10 flex justify-center"
    >
      <div className="bg-gray-200 shadow-2xl rounded-2xl p-8 max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center ">
        {/* IMAGE */}
        <div className="flex justify-center">
          <Image
            height={375}
            width={375}
            src={`http://localhost:8080/api/products/${productDetail.id}/image`}
            alt={productDetail.name}
            className="rounded-xl max-h-[400px] object-contain shadow-md"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-purple-800">
            {productDetail.name}
          </h1>

          <Card className="w-full max-w-sm h-[350px] ">
            <CardHeader>
              <CardTitle className="mt-10">
                Brand: {productDetail.brand}
              </CardTitle>
              <CardDescription className="my-2">
                Description: {productDetail.description}
              </CardDescription>
              <CardTitle className="my-2">
                Category: {productDetail.category}
              </CardTitle>
              <CardTitle className="my-2">
                Release Date: {productDetail.category}
              </CardTitle>
              <CardTitle className="my-2">
                Available: {productDetail.available ? "Yes" : "No"}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <Button type="submit" className="">
                Add to Wishlist
              </Button>
              <Button type="submit" className="">
                Add to Cart
              </Button>
            </CardFooter>
            <CardFooter className="flex gap-2">
              <Button type="submit" className="">
                Update
              </Button>
              <Button type="submit" className="">
                Delete
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
