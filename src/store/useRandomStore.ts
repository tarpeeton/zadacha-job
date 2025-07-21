import { create } from "zustand";
import { IRandomStore } from "../types/useRandomStore";
import axios from "axios";
import { BASE_URL } from "@/constants/baseUrl";

export const useRandomStore = create<IRandomStore>((set, get) => ({
  inputType: "specific",
  numberInput: "",
  category: "trivia",
  result: "",
  error: "",
  loading: false,
  showResult: false,
  userInput: { number: "", category: "", type: "" },

  setInputType: (val) => set({ inputType: val }),
  setNumberInput: (val) => set({ numberInput: val }),
  setCategory: (val) => set({ category: val }),
  setResult: (val) => set({ result: val }),
  setError: (val) => set({ error: val }),
  setLoading: (val) => set({ loading: val }),
  setShowResult: (val) => set({ showResult: val }),
  setUserInput: (val) => set({ userInput: val }),

  reset: () =>
    set({
      inputType: "specific",
      numberInput: "",
      category: "trivia",
      result: "",
      error: "",
      loading: false,
      showResult: false,
      userInput: { number: "", category: "", type: "" },
    }),

  validateInput: () => {
    const { inputType, numberInput } = get();
    if (
      inputType === "specific" &&
      (!numberInput || isNaN(Number(numberInput)))
    ) {
      set({ error: "Число должно быть в виде цифры" });
      return false;
    }
    return true;
  },

  fetchNumberFact: async () => {
    const {
      inputType,
      numberInput,
      category,
      validateInput,
      setError,
      setResult,
      setLoading,
      setUserInput,
      setShowResult,
    } = get();

    setError("");
    setResult("");

    if (!validateInput()) return;

    setLoading(true);

    try {
      const url =
        inputType === "random"
          ? `${BASE_URL}/random/${category}`
          : `${BASE_URL}/${numberInput}/${category}`;

      const response = await axios.get(url);

      setResult(response.data);
      setUserInput({
        number: inputType === "random" ? "случайное число" : numberInput,
        category:
          category === "trivia"
            ? "Интересные факты"
            : category === "math"
            ? "Математические факты"
            : "Исторические даты",
        type: inputType === "random" ? "Случайное число" : "Конкретное число",
      });
      setShowResult(true);
    } catch (err) {
      setError(
        "Произошла ошибка при получении данных. Проверьте подключение к интернету."
      );
    } finally {
      setLoading(false);
    }
  },
}));
