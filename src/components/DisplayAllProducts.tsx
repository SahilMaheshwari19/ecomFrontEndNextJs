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
    <div className="m-15">
      <div>DisplayAllProducts</div>
      {loading ? (
        <div className="text-center mt-40 text-purple-700 text-xl">
          Loading Products
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((products) => (
            <Card
              key={products.id}
              className="w-full max-w-sm hover:bg-fuchsia-200 transition"
            >
              <CardHeader>
                <div className="flex flex-col items-center shadow ">
                  <CardDescription>
                    {products.imageName ? (
                      <div>
                        <Image
                          src={`http://localhost:8080/api/products/${products.id}/image`}
                          alt={products.name}
                          className="rounded size-60 p-4"
                          height={150}
                          width={150}
                        />
                      </div>
                    ) : (
                      <>
                        <p>No IMAGE AVAILABLE</p>
                        <p>Enter your email below to login to your account</p>
                      </>
                    )}
                  </CardDescription>
                  <CardTitle>{products.name}</CardTitle>
                  <CardTitle>{products.brand}</CardTitle>
                </div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayAllProducts;
