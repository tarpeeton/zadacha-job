type UserInput = {
  number: string;
  category: string;
  type: string;
};

export interface IRandomStore {
  inputType: "specific" | "random";
  numberInput: string;
  category: "trivia" | "math" | "date";
  result: string;
  error: string;
  loading: boolean;
  showResult: boolean;
  userInput: UserInput;
  validateInput: () => boolean;
  setInputType: (val: "specific" | "random") => void;
  setNumberInput: (val: string) => void;
  setCategory: (val: "trivia" | "math" | "date") => void;
  setResult: (val: string) => void;
  setError: (val: string) => void;
  setLoading: (val: boolean) => void;
  setShowResult: (val: boolean) => void;
  setUserInput: (val: UserInput) => void;

  reset: () => void;
  fetchNumberFact: () => Promise<void>;
}
