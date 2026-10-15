// Define data type, need type to import
export interface Transactions {
  id: number;
  type: "expense" | "income";
  title: string;
  amount: number;
  category: string;
  date: string;
}
