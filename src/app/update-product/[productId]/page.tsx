"use client";
import ProductForm from "@/components/ProductForm";
import { ProductDTO } from "@/types/ProductList";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UpdateProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    axios
      .get<ProductDTO>(`http://localhost:8080/api/products/${productId}`, {
        withCredentials: true, // ✅ THIS sends cookies with request
      })
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

  const onSubmit = async (data: ProductDTO, imageFile: File | null) => {
    try {
      const formData = new FormData();
      const productBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      formData.append("product", productBlob);
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await axios.put(
        `http://localhost:8080/api/product/${productId}`,
        formData,
        {
          withCredentials: true, // ✅ THIS sends cookies with request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product Updated Successfully: ", response.data);
    } catch (error) {
      console.error("Error Updating Product:", error);
      alert("Failed to Update product. Please try again.");
    }
  };

  if (user.userrole !== "ROLE_ADMIN") {
    return <p>Unauthorized</p>;
  }
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-purple-700">
        Loading product details...
      </div>
    );
  }
  return (
    <section
      id="updateProduct"
      className="min-h-[700px]  bg-gradient-to-b from-slate-200 via-slate-400 to-slate-900 flex justify-center px-4 "
    >
      <div className="bg-purple-50 rounded-2xl shadow-lg max-w-md w-full p-8 mt-3 ">
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-6">
          Update Product
        </h1>
        <motion.div
          className="mt-10 basis-3/5 md:mt-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductForm
            defaultValues={productDetail}
            onSubmit={onSubmit}
            buttonLabel="Update Product"
            requireImage={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UpdateProductDetails;
