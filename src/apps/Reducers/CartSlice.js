import {createSlice} from "@reduxjs/toolkit"

/*
  STEP 1: Load cart items from localStorage
  - Reads saved cart data on page refresh
*/

const loadCartFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data
      ? JSON.parse(data)
      : {
          count: 0,
          items: [],
        };
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return {
      count: 0,
      items: [],
    };
  }
};
/*
  STEP 2: Save cart items to localStorage
*/

const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
};

  // Initial state (restored from localStorage)
  const initialState = loadCartFromLocalStorage();

/*
  STEP 3: Create cart slice
*/

const cartSlice = createSlice({
  name: "cart",
  initialState,

 
  reducers: {
    /*
      ADD TO CART
      - action.payload → full product object from mockProducts
      - Uses _id to avoid duplicates
    */
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      state.count += 1;
      saveCartToLocalStorage(state);
    },

    /*
      REMOVE FROM CART (entire product)
    */
        removeFromCart: (state, action) => {
            const productId = action.payload;

            const existingItem = state.items.find(
                (item) => item._id === productId
            );

            if (existingItem) {
              state.count -= existingItem.quantity;
                state.items = state.items.filter(
                (item) => item._id !== productId
                );
            }

            if (state.count < 0) state.count = 0;
            saveCartToLocalStorage(state);
            },


      /*
      INCREASE QUANTITY (+ button)
    */
       increaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item._id === productId
      );

      if (item) {
        item.quantity += 1;
        state.count += 1;
        saveCartToLocalStorage(state);
      }
    },

      /*
      DECREASE QUANTITY (- button)
    */
    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find(
        (item) => item._id === productId
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        state.count -= 1;
      } else {
        // remove item if quantity becomes 0
        state.items = state.items.filter(
          (i) => i._id !== productId
        );
        state.count -= 1;
      }

      if (state.count < 0) state.count = 0;
      saveCartToLocalStorage(state);
    },



     /*
      CLEAR CART
    */
    clearCart: (state) => {
      state.count = 0;
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
})

/*
  STEP 4: Export Actions & Reducer
*/
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;