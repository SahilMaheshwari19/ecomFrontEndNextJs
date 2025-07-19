import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/ProductList";

// Extend Product with quantity
type CartItem = Product & { Cartquantity: number };

interface CartState {
  itemsInCart: CartItem[];
}

const initialState: CartState = {
  itemsInCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers : {
    addToCart(state, action:PayloadAction<Product>){
      const existingItem = state.itemsInCart.find(item => item.id === action.payload.id);
      if(existingItem){
        existingItem.Cartquantity += 1;
      }
      else{
        state.itemsInCart.push({...action.payload, Cartquantity : 1});
      }
    },
    removeFromCart(state, action:PayloadAction<number>){
      state.itemsInCart = state.itemsInCart.filter(item => item.id !== action.payload);
    },
    clearCart(state){
      state.itemsInCart = [];
    },
    decrementQuantity(state, action:PayloadAction<number>){
      const item = state.itemsInCart.find(item => item.id === action.payload);
      if(item){
        item.Cartquantity -= 1;
        if(item.Cartquantity <= 0){
          state.itemsInCart = state.itemsInCart.filter( i => i.id !== item.id);
        }
      }
    }
  }
})

export const { addToCart, removeFromCart, clearCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;