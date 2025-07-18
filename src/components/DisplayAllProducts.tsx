"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/ProductList";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";

const DisplayAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
        console.log(products, loading);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="">
      <div>DisplayAllProducts</div>
      {loading ? (
        <div className="text-center mt-40 text-purple-700 text-xl">
          Loading Products
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((products) => (
            <Card key={products.id} className="w-full max-w-sm ">
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="justify-items-center-safe py-0.5">
                  {products.imageName ? (
                    <Image
                      src={`http://localhost:8080/api/products/${products.id}/image`}
                      alt={products.name}
                      height={180}
                      width={375}
                      className="rounded-2xl"
                    />
                  ) : (
                    <p>No IMAGE AVAILABLE</p>
                  )}
                </figure>
                <div className="flex flex-col gap-y-1.5 pt-1 card-body items-center text-center">
                  <CardTitle className="mt-1">{products.brand}</CardTitle>
                  <CardTitle>{products.name}</CardTitle>
                  <Button className="my-3 cursor-pointer ">Buy Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayAllProducts;
