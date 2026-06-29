import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getSingleProductApi,
  updateProductApi,
} from "../../api/fakeStoreproducts";
import { Product } from "../../types/types";

// 🔹 GET ALL
export const getAllProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("productData/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = (await getAllProductsApi()) as Response;
    const data: Product[] = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});

// 🔹 CREATE
export const createProduct = createAsyncThunk<
  Product,
  void,
  { rejectValue: string }
>("productData/create", async (_, { rejectWithValue }) => {
  try {
    const response = (await createProductApi()) as Response;
    const data: Product = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Create failed");
  }
});

// 🔹 GET SINGLE
export const getSingleProduct = createAsyncThunk<
  Product,
  void,
  { rejectValue: string }
>("productData/single", async (_, { rejectWithValue }) => {
  try {
    const response = (await getSingleProductApi()) as Response;
    const data: Product = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Fetch failed");
  }
});

// 🔹 UPDATE
export const updateProduct = createAsyncThunk<
  Product,
  void,
  { rejectValue: string }
>("productData/update", async (_, { rejectWithValue }) => {
  try {
    const response = (await updateProductApi()) as Response;
    const data: Product = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Update failed");
  }
});

// 🔹 DELETE
export const deleteProduct = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("productData/delete", async (_, { rejectWithValue }) => {
  try {
    const response = (await deleteProductApi()) as Response;
    const data = await response.json();
    return data.id; // return ID only
  } catch (error: any) {
    return rejectWithValue(error.message || "Delete failed");
  }
});