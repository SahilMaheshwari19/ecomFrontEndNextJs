"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Product } from "@/types/ProductList";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { productId } = useParams<{ productId: string }>();
  const router = useRouter();
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

  const handleDelete = (productId: string) => {
    try {
      axios.delete(`http://localhost:8080/api/product/${productId}`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
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
      className="bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 min-h-screen pb-10 flex justify-center"
    >
      <div className="bg-gray-200 shadow-2xl rounded-2xl p-8 max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center mt-4">
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
              <Button
                type="submit"
                className="cursor-pointer"
                variant="outline"
              >
                <HeartIcon />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="cursor-pointer">
                <ShoppingCartIcon />
                Add to Cart
              </Button>
            </CardFooter>
            <CardFooter className="flex gap-2">
              <Link href={`/update-product/${productDetail.id}`}>
                <Button type="submit" className="cursor-pointer">
                  Update
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your Product !
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(productId)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
