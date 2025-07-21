"use client";

import { useRandomStore } from "@/store/useRandomStore";

export const Result = () => {
  const { userInput, result, reset } = useRandomStore();

  return (
    <div className="min-h-screen  p-5 font-sans">
      <div className="max-w-3xl mx-auto bg-black/20 rounded-2xl p-10 shadow-2xl text-white">
        <h1 className="text-center mb-8 text-4xl font-bold">Результат</h1>

        {/* User Input Info */}
        <div className=" p-5 rounded-xl mb-8">
          <h3 className="mb-4 text-lg font-semibold">Ваш запрос:</h3>
          <p>
            <strong>Тип:</strong> {userInput.type}
          </p>
          <p>
            <strong>Число:</strong> {userInput.number}
          </p>
          <p>
            <strong>Категория:</strong> {userInput.category}
          </p>
        </div>

        {/* Result Block */}
        <div className="bg-white/10 p-8 rounded-xl mb-8 border-2 border-white/20">
          <h4 className="mb-5 text-2xl text-center font-semibold">
            Интересный факт:
          </h4>
          <p className="text-lg leading-relaxed text-center">{result}</p>
        </div>

        {/* Button to refresh */}
        <div className="text-center">
          <button
            onClick={reset}
            role="button"
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Новый запрос
          </button>
        </div>
      </div>
    </div>
  );
};
