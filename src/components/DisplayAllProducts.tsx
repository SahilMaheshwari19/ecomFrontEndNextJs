"use client";
import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/ProductList";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const DisplayAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const trcss = "text-lg text-orange-400 font-bold ";

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
    <div>
      <div className="my-4 items-center text-center">
        <h1 className="font-bold">All Products</h1>
      </div>
      {loading ? (
        <div className="text-center mt-40 text-purple-700 text-xl">
          Loading Products
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-2 sm:p-4 md:p-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="w-full max-w-sm flex flex-col justify-between bg-base-100 shadow-sm h-[380px] 
                transition-transform transform hover:-translate-y-2 hover:shadow-lg rounded-xl hover:border hover:border-purple-400"
            >
              <Link href={`/ProductDetails/${product.id}`} className="block">
                <div className="w-full relative h-44">
                  {product.imageName ? (
                    <Image
                      src={`http://localhost:8080/api/products/${product.id}/image`}
                      alt={product.name}
                      style={{ aspectRatio: "5/3" }}
                      height={140}
                      width={375}
                      className="object-contain mx-auto rounded-2xl"
                    />
                  ) : (
                    <p className="flex items-center justify-center h-full text-gray-400">
                      No IMAGE AVAILABLE
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-y-1.5 pt-1 card-body items-center text-center mt-12">
                  <table>
                    <tbody>
                      <tr>
                        <td className={`${trcss}`}>Name : </td>
                        <td>
                          <CardTitle>{product.name}</CardTitle>
                        </td>
                      </tr>
                      <tr>
                        <td className={`${trcss}`}>Brand : </td>
                        <td>
                          <CardTitle>{product.brand}</CardTitle>
                        </td>
                      </tr>
                      <tr>
                        <td className={`${trcss}`}>Price(₹): </td>
                        <td>
                          <CardTitle className="px-0.5 py-0.5 rounded bg-green-100 text-green-700 font-semibold">
                            {product.price}
                          </CardTitle>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Link>
              <div className="flex justify-around gap-3 mb-3 ">
                <Button
                  type="submit"
                  variant="outline"
                  className="cursor-pointer outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handle add to cart
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  className="cursor-pointer outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handle add to cart
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  className="cursor-pointer outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handle add to cart
                  }}
                >
                  Add to Wishlist
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayAllProducts;
