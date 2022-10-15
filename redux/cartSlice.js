import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // actions
    addToCart: (state, action) => {
      // state.cartItems = [...state.cartItems, action.payload];
      
      // also could write like this since reducers in the slices use immer.js that worries about
      // state mutation so we don't have to
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload.id
      );
      let newCart = [...state.cartItems];

      if (index >= 0) {
        // remove the item from the array at a particular index
        newCart.splice(index, 1);
      } else {
        console.log(
          `Cannot remove product (id: ${action.payload.id})...it is not in cart!`
        );
      }
      state.cartItems = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// retrieving items in the state to use in different components
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartItemsWithId = (state, id) => {
  state.cart.cartItems.filter((cartItem) => cartItem._id === id);
};
export const selectCartTotal = (state) => {
  state.cart.cartItems.reduce((acc, cartItem) => (acc += cartItem.price), 0);
};

export default cartSlice.reducer;
