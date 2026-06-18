const STORAGE_KEY = "studentFinanceTracker";

export function saveData(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function loadData() {
  return (
    JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || []
  );
}
