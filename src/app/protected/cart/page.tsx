"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  addToCart,
  clearCart,
  decrementQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import { toast } from "sonner";
import { SquareMinus, SquarePlus } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.itemsInCart);

  const cartTotals = cartItems.reduce(
    (total, item) => total + item.price * item.Cartquantity,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    toast("Removed from cart.", {
      description: `The item has been removed.`,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 pt-16 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {" "}
        {/* Increased container width */}
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-purple-600">
            Your cart is currently empty.
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((inCartItems) => {
                const itemTot = inCartItems.price * inCartItems.Cartquantity;
                return (
                  <div
                    key={inCartItems.id}
                    className="flex flex-col sm:flex-row items-center bg-white shadow-md hover:shadow-lg rounded-2xl border border-purple-100 transition-all p-6 gap-6 sm:gap-8"
                  >
                    <div className="flex-1 w-full">
                      <h2 className="text-2xl font-semibold text-purple-900 mb-2">
                        {inCartItems.name}
                      </h2>
                      <div className="flex flex-wrap gap-4 sm:gap-8 items-center mb-3">
                        <p className="text-gray-700">
                          <span className="font-medium text-purple-700">
                            Brand:
                          </span>{" "}
                          {inCartItems.brand}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-purple-700">
                            Category:
                          </span>{" "}
                          {inCartItems.category}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium text-purple-700">
                            Price:
                          </span>{" "}
                          ₹{inCartItems.price}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">
                            Qty:
                          </span>
                          <button
                            onClick={() => dispatch(addToCart(inCartItems))}
                            className="bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-800 rounded-full p-1 transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <SquarePlus className="w-5 h-5" />
                          </button>
                          <span className="font-semibold text-lg text-gray-800">
                            {inCartItems.Cartquantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(decrementQuantity(inCartItems.id))
                            }
                            className="bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-800 rounded-full p-1 transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <SquareMinus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Flex row to align Remove and Subtotal at same height */}
                    <div className="flex flex-row items-center gap-4 min-w-[200px]">
                      <button
                        onClick={() => handleRemove(inCartItems.id)}
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-full shadow transition cursor-pointer"
                      >
                        Remove
                      </button>
                      <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-purple-800 font-semibold text-center shadow min-w-[120px] items-center">
                        ₹{itemTot}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Empty Cart */}

            {/* Cart Total */}
            <div className="max-w-6xl mx-auto mt-12 sticky bottom-4 z-40 px-4">
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-lg mr-2.5">
                  Cart Total: ₹{cartTotals}
                </div>
                <button
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xl font-bold px-8 py-3 rounded-2xl shadow-lg cursor-pointer"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
