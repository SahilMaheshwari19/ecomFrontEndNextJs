"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { removeFromCart } from "@/store/cartSlice";
import { toast } from "sonner";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.itemsInCart);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    toast("Removed from cart.", {
      description: `The item has been removed.`,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-purple-600">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((inCartItems) => (
              <div
                key={inCartItems.id}
                className="flex flex-col sm:flex-row bg-white shadow-md rounded-xl overflow-hidden border border-purple-200 hover:shadow-lg transition p-4"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-purple-900 mb-1">
                    {inCartItems.name}
                  </h2>
                  <div className="flex gap-6 flex-wrap">
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Brand: </span>
                      {inCartItems.brand}
                    </p>
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Category: </span>
                      {inCartItems.category}
                    </p>
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Price: ₹</span>
                      {inCartItems.price}
                    </p>
                    <p className="text-purple-700 mb-1">
                      <span className="text-black">Quantity: </span>
                      {inCartItems.Cartquantity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-start sm:items-end">
                  <button
                    onClick={() => handleRemove(inCartItems.id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition w-full sm:w-auto"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
