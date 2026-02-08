import { createSlice } from "@reduxjs/toolkit"

/*
  STEP 1: Load wish items from localStorage
  - Reads saved wish data on page refresh and normalizes it
*/

const loadwishFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("wish");
    if (!data) return { count: 0, items: [] };

    const parsed = JSON.parse(data);

    // If stored as an array (older format), convert to {count, items}
    if (Array.isArray(parsed)) {
      const count = parsed.reduce((sum, item) => sum + (item.quantity || 1), 0);
      return { count, items: parsed };
    }

    // If stored as an object with items array, validate and normalize
    if (parsed && typeof parsed === "object") {
      if (Array.isArray(parsed.items)) {
        const count = typeof parsed.count === "number" ? parsed.count : parsed.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        return { count, items: parsed.items };
      }
    }

    // Fallback
    return { count: 0, items: [] };
  } catch (error) {
    console.error("Error loading wish from localStorage", error);
    return {
      count: 0,
      items: [],
    };
  }
};
/*
  STEP 2: Save wish items to localStorage
*/

const savewishToLocalStorage = (state) => {
  try {
    // Normalize payload to ensure consistent storage format
    const payload = {
      count: typeof state.count === 'number' ? state.count : (Array.isArray(state) ? state.reduce((s, i) => s + (i.quantity || 1), 0) : 0),
      items: Array.isArray(state.items) ? state.items : (Array.isArray(state) ? state : []),
    };

    localStorage.setItem("wish", JSON.stringify(payload));
  } catch (error) {
    console.error("Error saving wish to localStorage", error);
  }
};

  // Initial state (restored from localStorage)
  const initialState = loadwishFromLocalStorage();

/*
  STEP 3: Create wish List
*/

const wishList = createSlice({
  name: "wish",
  initialState,

 
  reducers: {
    /*
      ADD TO wish
      - action.payload → full product object from mockProducts
      - Uses _id to avoid duplicates
    */
    addTowish: (state, action) => {
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
      savewishToLocalStorage(state);
    },

    /*
      REMOVE FROM wish (entire product)
    */
        removeFromwish: (state, action) => {
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
            savewishToLocalStorage(state);
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
        savewishToLocalStorage(state);
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
      savewishToLocalStorage(state);
    },



     /*
      CLEAR wish
    */
    clearwish: (state) => {
      state.count = 0;
      state.items = [];
      savewishToLocalStorage(state);
    },
  },
})

/*
  STEP 4: Export Actions & Reducer
*/
export const {
  addTowish,
  removeFromwish,
  increaseQuantity,
  decreaseQuantity,
  clearwish,
} = wishList.actions;

export default wishList.reducer;