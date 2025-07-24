"use client";
import ProductForm from "@/components/ProductForm";
import type { ProductDTO } from "@/types/ProductList";
import tokenApi from "@/utils/axiosConfig";
import { motion } from "framer-motion";

const AddProduct = () => {
  const onSubmit = async (data: ProductDTO, imageFile: File | null) => {
    if (!imageFile) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      const productBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      formData.append("product", productBlob);
      formData.append("imageFile", imageFile);

      const response = await tokenApi.post("/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product Added Successfully: ", response.data);
      alert("Product Added Successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <section
      id="addProduct"
      className="min-h-[700px] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-900 flex items-center justify-center px-4 "
    >
      <div className="bg-purple-50 rounded-2xl shadow-lg max-w-md w-full p-8 mt-1">
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-6">
          Add Product
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
            onSubmit={onSubmit}
            buttonLabel="Add Product"
            requireImage={true}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AddProduct;
