// context/categoryContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Category  } from "../types/category";
import { GET } from "../api/api_utility";

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  findCategoryById: (id: string, categories?: Category[]) => Category | null;
  getAllCategories: () => Category[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // 🧩 Convert "children" to "subcategories" recursively and normalize dates recursively
  const normalizeCategoryTree = (cat: any): Category => ({
    ...cat,
    subcategories: Array.isArray(cat.children)
      ? cat.children.map(normalizeCategoryTree)
      : [],
    createdAt: cat.createdAt ? new Date(cat.createdAt) : new Date(),
    updatedAt: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await GET(`/api/v1/category/tree`);

      const data = res.data; // axios gives data here
      console.log("Fetched category tree:", data);

      if (data.success) {
        // Defensive check: try multiple possible locations for the array
        const rawList = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.categories)
            ? data.categories
            : Array.isArray(data.data?.categories)
              ? data.data.categories
              : [];

        // 🧩 Convert "children" to "subcategories" recursively and normalize dates recursively
        const normalizedList = rawList.map(normalizeCategoryTree);
        setCategories(normalizedList);
      } else {
        console.error("Failed to fetch categories:", data.message);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);



  const findCategoryById = (id: string, cats: Category[] = categories): Category | null => {
    if (!Array.isArray(cats)) return null;
    for (const cat of cats) {
      if (!cat) continue;
      if (String(cat.id) === String(id)) return cat;
      const found = findCategoryById(id, cat.subcategories || []);
      if (found) return found;
    }
    return null;
  };

  const getAllCategories = (): Category[] => {
    const flatten = (cats: Category[] = []): Category[] =>
      cats.reduce(
        (acc, cat) => [...acc, cat, ...flatten(cat.subcategories || [])],
        [] as Category[]
      );
    return flatten(categories);
  };


  return (
    <CategoryContext.Provider value={{ categories, loading, findCategoryById, getAllCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}








// const updateCategory = (id: string, data: Partial<CategoryFormData>) => {
//     const updateInTree = (cats: Category[]): Category[] =>
//       cats.map(cat => {
//         if (getCategoryId(cat) === id) {
//           return { ...cat, ...data, updatedAt: new Date() } as Category;
//         }
//         return { ...cat, subcategories: updateInTree(cat.subcategories || []) };
//       });
//     setCategories(prev => updateInTree(prev));
//   };

//   const deleteCategory = (id: string) => {
//     const deleteFromTree = (cats: Category[]): Category[] =>
//       cats
//         .filter(cat => getCategoryId(cat) !== id)
//         .map(cat => ({ ...cat, subcategories: deleteFromTree(cat.subcategories || []) }));
//     setCategories(prev => deleteFromTree(prev));
//   };