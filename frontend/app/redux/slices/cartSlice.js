import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const item = state.cartItems.find((p) => p.ProductId == action.payload.ProductId);
      console.log("item->", item);
      if (item) {
        item.Quantity++;
        item.price = item.selectedQuantityPrice * item.Quantity;
      } else {
        state.cartItems.push({ ...action.payload, Quantity: 1 });
        console.log(state.cartItems);
      }
    },
    addMultipleToCart: (state, action) => {
      console.log(action.payload);
      // const item = state.cartItems.find((p) => p._id == action.payload._id);
      // console.log("item->", item);
      // if (item) {
      //   item.quantity++;
      //   item.price = item.selectedQuantityPrice * item.quantity;
      // } else {
        state.cartItems = [...action.payload];
        console.log(state.cartItems);
      // }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.ProductId === action.payload.id) {
          if (action.payload.key === "Quantity") {
            p.selectedQuantityPrice = p.price * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });
    },
    removeFromCart: (state, action) => {
      console.log("Payload->",action.payload)
      state.cartItems = state.cartItems.filter(
        (p) => p.ProductId !== action.payload
      )
    },
    emptyCart: (state) => {
      state.cartItems = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart,addMultipleToCart,emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
