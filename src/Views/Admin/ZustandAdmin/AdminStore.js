import { create } from "zustand";
import axios from "axios";

export const useAdminStore = create((set) => ({
  allCategories: [],
  allThemes: [],
  categoriesWithProducts: [],
  themeWithProducts: [],
  allOrders: [],

  getCatgoriesAndThemes: async () => {
    const URLAllTheme = "https://ge3k-server.onrender.com/themes";
    const URLAllCategories = "https://ge3k-server.onrender.com/categories";
    const URLCategories =
      "https://ge3k-server.onrender.com/categories?active=yes";
    const URLThemes = "https://ge3k-server.onrender.com/themes?active=yes";

    try {
      const [allThemes, allCategories, categories, themes] = await Promise.all([
        axios.get(URLAllTheme),
        axios.get(URLAllCategories),
        axios.get(URLCategories),
        axios.get(URLThemes),
      ]);

      set((state) => {
        return {
          ...state,
          allCategories: allCategories.data,
          allThemes: allThemes.data,
          categoriesWithProducts: categories.data,
          themeWithProducts: themes.data,
        };
      });

      // Ahora puedes acceder a los datos de cada petición
    } catch (error) {
      console.log(error);
    }
  },

  getOrdersFromBack: async () => {
    const URL = "https://ge3k-server.onrender.com/orders";
    try {
      const { data } = await axios.get(URL);
      set((state) => {
        return {
          ...state,
          allOrders: data,
        };
      });
      // Ahora puedes acceder a los datos de cada petición
    } catch (error) {
      throw Error(error);
    }
  },
}));
