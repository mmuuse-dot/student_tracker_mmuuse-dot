import { loadData } from "./storage.js";

export let transactions = loadData();

export function addTransaction(transaction) {
  transactions.push(transaction);
}

export function removeTransaction(id) {
  transactions = transactions.filter(
    t => t.id !== id
  );
}

export function updateTransaction(id, updated) {
  const index = transactions.findIndex(
    t => t.id === id
  );

  if (index !== -1) {
    transactions[index] = {
      ...transactions[index],
      ...updated,
      updatedAt: new Date().toISOString()
    };
  }
}
