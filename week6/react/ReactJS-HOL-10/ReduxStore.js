// HOL-10: Redux State Management
// Exercise: Set up Redux Toolkit store for a shopping cart
// npm install @reduxjs/toolkit react-redux

import { createSlice, configureStore } from '@reduxjs/toolkit';

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) state.total -= item.price * item.quantity;
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    login:  (state, action) => { state.user = action.payload; state.isAuthenticated = true;  },
    logout: (state)         => { state.user = null;           state.isAuthenticated = false; },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});
