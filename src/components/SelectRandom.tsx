"use client";
import { useRandomStore } from "@/store/useRandomStore";
import type React from "react";
import { Result } from "./ResultPage";
import Select from "./Select";
import { INPUT_TYPE_OPTIONS } from "@/constants/inputTypeOption";
import { CATEGORY_OPTIONS } from "@/constants/categoryOptions";

export default function Home() {
  const {
    inputType,
    numberInput,
    category,
    error,
    loading,
    showResult,
    setInputType,
    setNumberInput,
    setCategory,
    fetchNumberFact,
  } = useRandomStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchNumberFact();
  };

  if (showResult) {
    return <Result />;
  }

  return (
    <div className="h-screen flex items-center  justify-center">
      <div className="max-w-2xl lg:min-w-2xl mx-auto bg-black/20  rounded-2xl p-10 shadow-2xl text-white">
        <h1 className="text-center mb-8 text-4xl font-bold">Random Number</h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-3 text-lg font-bold">Тип числа:</label>
            <Select
              value={inputType}
              onChange={(val) => setInputType(val as "specific" | "random")}
              options={INPUT_TYPE_OPTIONS}
              placeholder="Выберите тип числа"
            />
          </div>

          {inputType === "specific" && (
            <div>
              <label className="block mb-3 text-lg font-bold">
                Введите число:
              </label>
              <input
                type="text"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder="Например: 42"
                className="w-full p-3 rounded-lg border-2 border-white/30 bg-white/10 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50"
              />
            </div>
          )}

          <div>
            <label className="block mb-3 text-lg font-bold">
              Категория информации:
            </label>
            <Select
              value={category}
              onChange={(val) => setCategory(val as "trivia" | "math" | "date")}
              options={CATEGORY_OPTIONS}
              placeholder="Выберите категорию"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500 p-4 rounded-lg text-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-4 rounded-lg text-xl font-bold transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
            } text-white`}
          >
            {loading ? "Загрузка..." : "Получить информацию"}
          </button>
        </div>
      </div>
    </div>
  );
}
