// // src/features/product/productThunks.ts
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Product } from "./types";

// const API_URL = "http://localhost:8080/api/products"; // ✅ Adjust backend URL

// // 🟢 Fetch all products
// export const fetchProducts = createAsyncThunk<Product[]>(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(API_URL);
//       return res.data.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // 🟢 Create new product
// export const createProduct = createAsyncThunk<Product, Partial<Product>>(
//   "products/create",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API_URL, data);
//       return res.data.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // 🟢 Update product
// export const updateProduct = createAsyncThunk<Product, Product>(
//   "products/update",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axios.put(`${API_URL}/${data._id || data.id}`, data);
//       return res.data.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // 🟢 Delete product
// export const deleteProduct = createAsyncThunk<string, string>(
//   "products/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
